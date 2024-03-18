import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import { In, Repository } from 'typeorm';
import {
  CreateUserDto,
  UpdateUserDto,
} from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { CreateUserFromExternalDto } from '../dto/create-user-from-external.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) { }

  async create(createUserDto: CreateUserDto | CreateUserFromExternalDto) {
    const user = await this.repository.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new BadRequestException();
    }

    const u = new UserEntity();
    Object.assign(u, { ...createUserDto });

    const saveUser = await this.repository.save(u);
    delete saveUser.password;
    delete saveUser.refreshToken;
    return saveUser;
  }

  async findAll(){
    return await this.repository.find({
      order: {
        updatedAt: "DESC"
      }
    });
  }

  async findByEmailAndGetPassword(email: string) {
    return await this.repository.findOne({
      select: ['id', 'password'],
      where: { email },
    });
  }

  async findOne(id: any) {
    return await this.repository.findOneBy({ id });
  }

  async findById(id: any) {
    return await this.repository.findOneOrFail({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.repository.findOneOrFail({
      where: { email },
    });
  }

  async emailAlreadyExists(email: string) {
    const user = await this.repository.findOneBy({ email })
    return !!user
  }

  async update(id: any, updateUserDto: UpdateUserDto) {
    const user = await this.repository.findOneBy({id});
    if (!user) {
      throw new NotFoundException(`UserEntity with id ${id} does not exist`);
    }
    Object.assign(user, {...updateUserDto})
    return this.repository.save(user);
  }

  async remove(id: any) {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`UserEntity with id ${id} does not exist`);
    }

    return this.repository.remove(user);
  }

  async setCurrentRefreshToken(refreshToken: string, userId: any) {
    //crypto is a node module, and bcrypt the maximum length of the hash is 60 characters, and token is longer than that, so we need to hash it
    const hash = createHash('sha256').update(refreshToken).digest('hex');
    const currentHashedRefreshToken = await bcrypt.hashSync(hash, 10);
    return await this.repository.update(userId, {
      refreshToken: currentHashedRefreshToken,
    });
  }

  async removeRefreshToken(userId: any) {
    await this.findById(userId);

    return this.repository.update(
      { id: userId },
      {
        refreshToken: null,
      },
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: any) {
    const user = await this.repository.findOne({
      select: ['id', 'refreshToken'],
      where: { id: userId },
    });

    const hash = createHash('sha256').update(refreshToken).digest('hex');
    const isRefreshTokenMatching = await bcrypt.compare(
      hash,
      user.refreshToken,
    );

    if (isRefreshTokenMatching) {
      return { id: user.id };
    }
  }

  async findByExternalId(externalId: string) {
    return await this.repository.findOneBy({ externalId });
  }

  async grantAdmin(id: any) {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`UserEntity with id ${id} does not exist`);
    }
    user.isAdmin = true;
    return this.repository.save(user);
  }
  async revokeAdmin(id: any) {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`UserEntity with id ${id} does not exist`);
    }
    user.isAdmin = false;
    return this.repository.save(user);
  }

  async grantStaff(id: any) {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`UserEntity with id ${id} does not exist`);
    }
    user.isAdmin = true;
    user.isStaff = true;
    return this.repository.save(user);
  }

  async getStaff() {
    return await this.repository.findOne({
      where: {
        isStaff: true,
      },
    });
  }

  removeMany(ids: number[]) {
    return this.repository.delete({ id: In(ids) });
  }
}
