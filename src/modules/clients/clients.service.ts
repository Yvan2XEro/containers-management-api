import { Injectable, NotFoundException, Search } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>,
  ) {}

  create(payload: CreateClientDto) {
    return this.repository.save(payload);
  }

  async findAll({ limit, page, q }: PaginationParams) {
    const query = this.repository.createQueryBuilder('cl');
    if (q && q.length > 0) {
      const search = q.toLocaleLowerCase();

      query
        .where(`LOWER(cl.name) like '%${search}%'`)
        .orWhere(`LOWER(cl.email) like '%${search}%'`)
        .orWhere(`LOWER(cl.phone) like '%${search}%'`)
        .orWhere(`LOWER(cl.address) like '%${search}%'`);
    }
    query.take(limit).skip((page - 1) * limit);
    const [data, count] = await query
      .orderBy('cl.updatedAt', 'DESC')
      .getManyAndCount();
    return {
      meta: { count },
      data,
    };
  }

  async findAllWintnPagination({ q }: { q: string }) {
    if (!q || q.length <= 0) {
      return [];
    }
    const query = this.repository.createQueryBuilder('cl');

    const search = q.toLocaleLowerCase();
    query
      .where(`LOWER(cl.name) like '%${search}%'`)
      .orWhere(`LOWER(cl.email) like '%${search}%'`)
      .orWhere(`LOWER(cl.phone) like '%${search}%'`)
      .orWhere(`LOWER(cl.address) like '%${search}%'`);
    return await query.orderBy('cl.updatedAt', 'DESC').getMany();
  }

  async findOne(id: number) {
    const check = await this.repository.findOne({ where: { id } });
    if (!check) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return check;
  }

  async update(id: number, payload: UpdateClientDto) {
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
      const item = new Client();
      item.address = 'Address ' + i;
      item.name = 'Client ' + i;
      item.email = `email${i}@email.test`;
      item.phone = `${i}${i + 1}${i + 4}${i + 6}${i + 5}`;

      await this.repository.save(item);
    }
  }
}
