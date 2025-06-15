import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import {
  paginateMeta,
  paginationParamsToPrismaParams,
} from '@/common/pagination/paginate-params';
import { CollectionRepositoryInterface } from './collection.repository.interface';
import { Collection } from '../entity/collection.entity';
import { CollectionFilterParams } from '../dtos/find-all-collection.dto';
import { CollectionSelect } from '../enums/collection-select.enum';
import { CollectionPrismaMapper } from '../mapper/collection-prisma.mapper';
import { RepositoryOptions } from '../../../interfaces/repository.interface';

const COLLECTION_SELECT_FIELDS: Prisma.WasteCollectionSelect = {
  id: true,
  userId: true,
  wasteTypeId: true,
  weight: true,
  points: true,
  created_at: true,
  updated_at: true,
};

@Injectable()
export class CollectionPrismaRepository implements CollectionRepositoryInterface {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly collectionMapper: CollectionPrismaMapper,
  ) {}

  async create(collection: Collection, opts?: RepositoryOptions) {
    const createdCollection = await this.prismaService.wasteCollection.create({
      data: this.collectionMapper.mapFromEntity(collection),
      select: COLLECTION_SELECT_FIELDS,
    });

    return this.collectionMapper.mapToEntity(createdCollection);
  }

  async findAll(params: CollectionFilterParams, opts?: RepositoryOptions) {
    const pagination = paginationParamsToPrismaParams(params);
    const where = this.getWhereClause(params);
    const select = params.select
      ? this.getSelectFields(params)
      : COLLECTION_SELECT_FIELDS;

    const [collections, meta] = await Promise.all([
      this.prismaService.wasteCollection.findMany({
        ...pagination,
        select,
        where,
      }),
      paginateMeta(
        await this.prismaService.wasteCollection.count({ where }),
        pagination,
      ),
    ]);

    return {
      data: collections.map(this.collectionMapper.mapToSelectableEntity),
      meta,
    };
  }

  async findOne(id: string, opts?: RepositoryOptions) {
    const collection = await this.prismaService.wasteCollection.findUnique({
      where: { id },
      select: COLLECTION_SELECT_FIELDS,
    });

    if (!collection) return null;

    return this.collectionMapper.mapToEntity(collection);
  }

  async update(collection: Collection, opts?: RepositoryOptions) {
    const updatedCollection = await this.prismaService.wasteCollection.update({
      where: { id: collection.id },
      data: this.collectionMapper.mapFromEntity(collection),
      select: COLLECTION_SELECT_FIELDS,
    });

    return this.collectionMapper.mapToEntity(updatedCollection);
  }

  async delete(id: string, opts?: RepositoryOptions) {
    const collection = await this.prismaService.wasteCollection.delete({
      where: { id },
      select: COLLECTION_SELECT_FIELDS,
    });

    if (!collection) return null;

    return this.collectionMapper.mapToEntity(collection);
  }

  async findByUserId(userId: string, opts?: RepositoryOptions) {
    const collections = await this.prismaService.wasteCollection.findMany({
      where: { userId },
      select: COLLECTION_SELECT_FIELDS,
    });

    return collections.map(this.collectionMapper.mapToEntity);
  }

  private getWhereClause(params: CollectionFilterParams): Prisma.WasteCollectionWhereInput {
    const where: Prisma.WasteCollectionWhereInput = {};

    if (params.userId) {
      where.userId = params.userId;
    }

    if (params.wasteTypeId) {
      where.wasteTypeId = params.wasteTypeId;
    }

    return where;
  }

  private getSelectFields(
    params: CollectionFilterParams,
  ): Prisma.WasteCollectionSelect {
    const select: Prisma.WasteCollectionSelect = {};

    if (params.select) {
      params.select.forEach((field) => {
        select[field] = true;
      });
    }

    return select;
  }
} 