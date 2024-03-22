import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChargeDto } from './dto/create-charge.dto';
import { UpdateChargeDto } from './dto/update-charge.dto';
import { Charge } from './entities/charge.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class ChargesService {
  constructor(
    @InjectRepository(Charge)
    private readonly repository: Repository<Charge>,
  ) {}

  create(payload: CreateChargeDto) {
    return this.repository.save(payload);
  }

  async findAll({
    limit,
    page,
    q,
    transaction,
    departureDate,
  }: PaginationParams & { transaction?: number; departureDate: any }) {
    const query = this.repository.createQueryBuilder('ch');
    query.leftJoinAndSelect('ch.transaction', 'tr');
    if (!departureDate && departureDate?.length < 2) {
      if (q && q.length > 0) {
        const search = q.toLocaleLowerCase();
        query.where(`LOWER(ch.number) like '%${search}%'`);
        query.orWhere(`ch.description like '%${search}%'`);
      }
    }
    if (!!transaction && !isNaN(transaction)) {
      query.andWhere(`ch.transaction_id = :transaction`, { transaction });
    }
    if (!!departureDate && departureDate?.length > 4) {
      query.andWhere(`tr.departureDate =  DATE(:departureDate)`, {
        departureDate,
      });
    }
    query.take(limit).skip((page - 1) * limit);
    const [data, count] = await query
      .orderBy('ch.updatedAt', 'DESC')
      .getManyAndCount();
    return {
      meta: { count },
      data,
    };
  }

  async findOne(id: number) {
    const check = await this.repository.findOne({ where: { id } });
    if (!check) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return check;
  }

  async update(id: number, payload: UpdateChargeDto) {
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

  async faker() {
    for (let i = 0; i < 100; i++) {
      const item = new Charge();
      item.capacity = i % 2 === 1 ? i * 10 : i * 2;
      item.maxWeigth = i * 15;
      item.type = 'C' + (i % 2);
      item.weigth = (i % 2 === 1 ? i * 10 : i * 2) * 5;
      item.description = 'description' + i;
      item.extraCoastAmount = i * 10;
      item.number = Math.floor(
        1000000000 + Math.random() * 9000000000,
      ).toString();

      await this.repository.save(item);
    }
  }
}
