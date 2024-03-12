import { Module } from '@nestjs/common';
import { CubicMetersService } from './cubic-meters.service';
import { CubicMetersController } from './cubic-meters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CubicMeter } from './entities/cubic-meter.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([CubicMeter]), UsersModule],
  controllers: [CubicMetersController],
  providers: [CubicMetersService],
  exports: [CubicMetersService],
})
export class CubicMetersModule {}
