import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Office } from './entities/office.entity';

@Injectable()
export class OfficesService {
  constructor(
    @InjectRepository(Office)
    private readonly repository: Repository<Office>,
  ) {}
  async create(payload: CreateOfficeDto) {
    const check = await this.repository.findOneBy({ name: payload.name });
    if (!!check)
      throw new ConflictException(
        `Item with name ${payload.name} allready exists`,
      );

      return this.repository.save(payload)
  }

  findAll() {
    return this.repository.find({
      relations: ['users'],
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const check = await this.repository.findOneBy({ id });
    if (!check) throw new NotFoundException(`Item with id ${id} not found`);
    return check;
  }

  async update(id: number, payload: UpdateOfficeDto) {
    const check = await this.findOne(id);
    Object.assign(check, { ...payload });
    return this.repository.save(check);
  }

  remove(id: number) {
    return this.repository.delete({ id });
  }

  removeMany(ids: number[]) {
    return this.repository.delete({ id: In(ids) });
  }
}
