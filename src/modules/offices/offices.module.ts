import { Module } from '@nestjs/common';
import { OfficesService } from './offices.service';
import { OfficesController } from './offices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Office } from './entities/office.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Office]), UsersModule],
  controllers: [OfficesController],
  providers: [OfficesService],
  exports: [OfficesService],
})
export class OfficesModule {}
