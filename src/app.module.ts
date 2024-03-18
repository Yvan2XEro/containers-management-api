import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PassportModule } from '@nestjs/passport';
import { join } from 'path';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientsModule } from './modules/clients/clients.module';
import { PackagesModule } from './modules/packages/packages.module';
import { ChargesModule } from './modules/charges/charges.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { CubicMetersModule } from './modules/cubic-meters/cubic-meters.module';
import { OfficesModule } from './modules/offices/offices.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true, validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
        API_URL: Joi.string().required(),
        ROOT_EMAIL: Joi.string().required(),
        ROOT_PASSWORD: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true,
      }
    }),
    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const drivertype = process.env.DRIVER_TYPE || 'postgres';
        const database = process.env.POSTGRES_DB;
        const host = process.env.POSTGRES_HOST;
        const password = process.env.POSTGRES_PASSWORD;
        const username = process.env.POSTGRES_USER;
        const port = (+process.env.POSTGRES_PORT || 5432);

        return ({
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          autoLoadEntities: true,
          synchronize: true,
          // logging: true,
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          cli: {
            migrationsDir: 'src/migrations'
          }
        })
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ClientsModule,
    PackagesModule,
    ChargesModule,
    TransactionsModule,
    CubicMetersModule,
    OfficesModule,
  ],
})
export class AppModule { }
