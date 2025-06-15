import { Injectable } from '@nestjs/common';
import { WasteCollection } from '@prisma/client';
import { Collection, SelectableCollection } from '../entity/collection.entity';
import { CollectionMapper } from './collection.mapper';
import { CreateCollectionDto } from '../dtos/create-collection.dto';
import { UpdateCollectionDto } from '../dtos/update-collection.dto';

@Injectable()
export class CollectionPrismaMapper implements CollectionMapper {
  mapToEntity(externalCollection: WasteCollection): Collection {
    return {
      id: externalCollection.id,
      userId: externalCollection.userId,
      wasteTypeId: externalCollection.wasteTypeId,
      weight: externalCollection.weight,
      points: externalCollection.points,
      created_at: externalCollection.created_at,
      updated_at: externalCollection.updated_at,
    };
  }

  mapFromEntity(collection: Collection): WasteCollection {
    return {
      id: collection.id,
      userId: collection.userId,
      wasteTypeId: collection.wasteTypeId,
      weight: collection.weight,
      points: collection.points,
      created_at: collection.created_at,
      updated_at: collection.updated_at,
    };
  }

  mapToSelectableEntity(collection: Partial<WasteCollection>): SelectableCollection {
    return {
      ...(collection.id && { id: collection.id }),
      ...(collection.userId && { userId: collection.userId }),
      ...(collection.wasteTypeId && { wasteTypeId: collection.wasteTypeId }),
      ...(collection.weight && { weight: collection.weight }),
      ...(collection.points && { points: collection.points }),
      ...(collection.created_at && { created_at: collection.created_at }),
      ...(collection.updated_at && { updated_at: collection.updated_at }),
    };
  }

  toEntity(dto: CreateCollectionDto | UpdateCollectionDto, userId?: string): Partial<Collection> {
    return {
      ...(userId && { userId }),
      ...(dto.wasteTypeId && { wasteTypeId: dto.wasteTypeId }),
      ...(dto.weight && { weight: dto.weight }),
    };
  }

  toDto(entity: Collection) {
    return {
      id: entity.id,
      userId: entity.userId,
      wasteTypeId: entity.wasteTypeId,
      weight: entity.weight,
      points: entity.points,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }
} 