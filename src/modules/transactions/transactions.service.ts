import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionsService {
  
  constructor(
    @InjectRepository(Transaction)
    private readonly repository: Repository<Transaction>,
  ) { }

  create(payload: CreateTransactionDto) {
    return this.repository.save(payload)
  }

  async findAll({limit,page, q}: PaginationParams) {
    const query = this.repository.createQueryBuilder("tr")
    if(q && q.length>0) {
      const search = q.toLocaleLowerCase()
      query.where(`LOWER(tr.trackingNumber) like '%${search}%'`)
      .orWhere(`LOWER(tr.departure_port_name) like '%${search}%'`)
      .orWhere(`LOWER(tr.arrival_port_name) like '%${search}%'`)
    }
    query.take(limit).skip((page-1)*limit)
    const [data, count] = await query.orderBy('tr.updatedAt', 'DESC').getManyAndCount()
    return {
      meta: {count},
      data
    }
  }

  async findOne(id: number) {
    const check = await this.repository.findOne({ where: { id } });
    if (!check) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return check  }

  async update(id: number, payload: UpdateTransactionDto) {
    const check = await this.findOne(id)
    Object.assign(check, {...payload})
    return this.repository.save(check)
  }

  remove(id: number) {
    return this.repository.delete({ id });
  }

  removeMany(ids: number[]) {
    return this.repository.delete({ id: In(ids) });
  }

  async faker() {
    for (let i = 0; i < 100; i++) {
      const item = new Transaction()
      // item.capacity = (i%2 ===1)?i*10:i*2
      // item.maxWeigth = i*15
      // item.type = "C"+i%2
      // item.weigth = ((i%2 ===1)?i*10:i*2)*5
      // item.number = Math.floor(1000000000 + Math.random() * 9000000000).toString();

      // await this.repository.save(item)
    }
  }
}
