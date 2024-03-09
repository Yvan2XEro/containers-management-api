import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/services/users.service';
import { PayloadToken } from '../models/token.model';
import config from '../../../config';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(config.KEY)
    private configService: ConfigType<typeof config>,
  ) { }

  async validateUser(email: string, password: string) {
    const user: {
      password: string;
      id: any;
    } = await this.usersService.findByEmailAndGetPassword(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const { password, ...rta } = user;
        return rta;
      }
    }
    return null;
  }


  async login(user: PayloadToken) {
    const { accessToken } = this.jwtToken(user);
    const refreshToken = this.jwtRefreshToken(user);
    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  jwtToken(user: PayloadToken) {
    const payload: PayloadToken = { id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  jwtRefreshToken(user: PayloadToken) {
    const payload = { id: user.id };

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.jwt.jwtRefreshSecret,
      expiresIn: `${this.configService.jwt.refreshTokenExpiration}`,
    });

    return refreshToken;
  }

  async logout(user: PayloadToken) {
    return await this.usersService.removeRefreshToken(user.id);
  }

  async createAccessTokenFromRefreshToken(user: PayloadToken) {
    return this.jwtToken(user);
  }

  async resetPassword(token: PayloadToken, paylod: ResetPasswordDto) {

    const savedUser = await this.usersService.findById(token.id);

    if (!savedUser) {
      throw new UnauthorizedException("User not found");
    }

    const user: {
      password: string;
      id: any;
    } = await this.usersService.findByEmailAndGetPassword(savedUser.email);

    if (user) {
      const isMatch = await bcrypt.compare(paylod.oldPassword, user.password);

      if (isMatch) {
        user.password = await bcrypt.hash(paylod.password, 10);
        return this.usersService.update(user.id, user);
      }
      throw new UnauthorizedException("Password not match");
    }

  }
}
