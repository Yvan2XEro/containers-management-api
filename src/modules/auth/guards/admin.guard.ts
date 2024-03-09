import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users/services/users.service';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly usersService: UsersService) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token: PayloadToken = request.user;
    if (!token) {
      return false;
    }
    const u = await this.usersService.findById(token.id)
    return u.isAdmin
  }

}
