import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { WasteTypeRepositoryInterface } from './waste-type.repository.interface';
import { WasteTypeEntity } from '../entity/waste-type.entity';
import { WasteTypeFindAllParams } from '../dtos/waste-type-find-all.params';
import { RepositoryOptions } from '@/interfaces/repository.interface';
import { FindAllResponse } from '@/interfaces/find-all-response.interface';
import { PaginationParams } from '@/common/decorators/pagination/pagination.decorator';
import { Prisma } from '@prisma/client';
import { WasteTypePrismaMapper } from '../mapper/waste-type-prisma.mapper';
import { WASTE_TYPE_SELECT } from '../enums/waste-type-select.enum';

const WASTE_TYPE_SELECT_FIELDS: Prisma.WasteTypeSelect = {
  id: true,
  name: true,
  description: true,
  points: true,
  created_at: true,
  updated_at: true,
};

@Injectable()
export class WasteTypePrismaRepository implements WasteTypeRepositoryInterface {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: WasteTypePrismaMapper,
  ) {}

  async create(entity: WasteTypeEntity, opts?: RepositoryOptions): Promise<WasteTypeEntity> {
    const data = this.mapper.mapFromEntity(entity);
    const wasteType = await this.prisma.wasteType.create({
      data,
      select: WASTE_TYPE_SELECT_FIELDS,
    });
    return this.mapper.mapToEntity(wasteType);
  }

  async findOne(id: string, opts?: RepositoryOptions): Promise<WasteTypeEntity> {
    const wasteType = await this.prisma.wasteType.findUnique({
      where: { id },
      select: WASTE_TYPE_SELECT_FIELDS,
    });
    if (!wasteType) return null;
    return this.mapper.mapToEntity(wasteType);
  }

  async findAll(
    params: WasteTypeFindAllParams & PaginationParams,
    opts?: RepositoryOptions,
  ): Promise<FindAllResponse<Partial<WasteTypeEntity>>> {
    const { page = 1, perPage = 10, search } = params;

    const where: Prisma.WasteTypeWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [total, data] = await Promise.all([
      this.prisma.wasteType.count({ where }),
      this.prisma.wasteType.findMany({
        where,
        select: WASTE_TYPE_SELECT_FIELDS,
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: { created_at: 'desc' },
      }),
    ]);

    const lastPage = Math.ceil(total / perPage);

    return {
      data: data.map(this.mapper.mapToEntity),
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        next: page < lastPage,
        prev: page > 1,
      },
    };
  }

  async update(entity: WasteTypeEntity, opts?: RepositoryOptions): Promise<WasteTypeEntity> {
    const { id, ...data } = this.mapper.mapFromEntity(entity);
    const wasteType = await this.prisma.wasteType.update({
      where: { id },
      data,
      select: WASTE_TYPE_SELECT_FIELDS,
    });
    return this.mapper.mapToEntity(wasteType);
  }

  async delete(id: string, opts?: RepositoryOptions): Promise<WasteTypeEntity> {
    const wasteType = await this.prisma.wasteType.delete({
      where: { id },
      select: WASTE_TYPE_SELECT_FIELDS,
    });
    return this.mapper.mapToEntity(wasteType);
  }
} 