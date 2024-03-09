
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../users/entities/user.entity';

export const GetCurrentUser = createParamDecorator(
    (_, ctx: ExecutionContext): UserEntity => {
        const req = ctx.switchToHttp().getRequest();
        return req.user;
    },
);

