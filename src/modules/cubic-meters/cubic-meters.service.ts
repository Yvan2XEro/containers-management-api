import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCubicMeterDto } from './dto/create-cubic-meter.dto';
import { UpdateCubicMeterDto } from './dto/update-cubic-meter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CubicMeter } from './entities/cubic-meter.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class CubicMetersService {
  constructor(
    @InjectRepository(CubicMeter)
    private readonly repository: Repository<CubicMeter>,
  ) {}

  async create(payload: CreateCubicMeterDto) {
    const check = await this.repository.findOneBy({ label: payload.label });
    if (check) {
      throw new ConflictException('CubicMeter already exists');
    }
    return this.repository.save(payload);
  }

  findAll() {
    return this.repository.find({ order: { updatedAt: 'DESC' } });
  }

  async findOne(id: number) {
    const check = await this.repository.findOne({ where: { id } });
    if (!check) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return check;
  }

  async update(id: number, updateCubicMeterDto: UpdateCubicMeterDto) {
    const check = await this.findOne(id);
    Object.assign(check, updateCubicMeterDto);
    return this.repository.save(check);
  }

  remove(id: number) {
    return this.repository.delete({ id });
  }
  removeMany(ids: number[]) {
    return this.repository.delete({ id: In(ids) });
  }
}
