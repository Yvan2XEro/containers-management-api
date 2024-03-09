import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { UsersController } from './controllers/users.controller';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule implements OnModuleInit {

  constructor(private readonly usersService: UsersService) { }
  async onModuleInit() {

    const email = process.env.ROOT_EMAIL
    const password = process.env.ROOT_PASSWORD

    const adminAlreadyExists = await this.usersService.emailAlreadyExists(email)


    if (!adminAlreadyExists) {
      const a = await this.usersService.create({
        email,
        password,
        name: "Super Admin",
      })
      this.usersService.grantStaff(a.id)
    }
  }
}
