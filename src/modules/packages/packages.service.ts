import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private readonly repository: Repository<Package>,
  ) {}

  create(payload: CreatePackageDto) {
    return this.repository.save(payload);
  }

  async findAll({
    limit,
    page,
    q,
    client,
  }: PaginationParams & { client?: number }) {
    const query = this.repository.createQueryBuilder('pack');
    query
      .leftJoinAndSelect('pack.client', 'cl')
      .leftJoinAndSelect('pack.charge', 'ch')
      .leftJoinAndSelect('pack.cubicMeter', 'cm');

    if (q && q.length > 0) {
      const search = q.toLocaleLowerCase();
      query.where(`LOWER(pack.tracking_number) like '%${search}%'`);
    }
    if (!!client && !isNaN(client)) {
      query.andWhere(`pack.client_id = :client`, { client });
    }
    query.take(limit).skip((page - 1) * limit);
    const [data, count] = await query
      .orderBy('pack.updatedAt', 'DESC')
      .getManyAndCount();
    return {
      meta: { count },
      data,
    };
  }

  async findByChargeId(id: number) {
    const query = this.repository
      .createQueryBuilder('pack')
      .leftJoinAndSelect('pack.client', 'cl')
      .leftJoinAndSelect('pack.charge', 'ch')
      .leftJoinAndSelect('pack.cubicMeter', 'cm')
      .leftJoinAndSelect('ch.transaction', 'tr')
      .where('charge_id = :id', { id });

    return query.getMany();
  }

  async findOne(id: number) {
    const check = await this.repository.findOne({ where: { id } });
    if (!check) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return check;
  }

  async update(id: number, payload: UpdatePackageDto) {
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
