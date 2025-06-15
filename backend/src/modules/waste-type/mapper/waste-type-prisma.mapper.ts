import { Injectable } from '@nestjs/common';
import { WasteType as PrismaWasteType } from '@prisma/client';
import { WasteTypeEntity } from '../entity/waste-type.entity';
import { WasteTypeMapper } from './waste-type.mapper';
import { CreateWasteTypeDto } from '../dtos/create-waste-type.dto';
import { UpdateWasteTypeDto } from '../dtos/update-waste-type.dto';

@Injectable()
export class WasteTypePrismaMapper implements WasteTypeMapper<PrismaWasteType> {
  mapToEntity(external: PrismaWasteType): WasteTypeEntity {
    return {
      id: external.id,
      name: external.name,
      description: external.description,
      points: external.points,
      created_at: external.created_at,
      updated_at: external.updated_at,
    };
  }

  mapFromEntity(entity: WasteTypeEntity): PrismaWasteType {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      points: entity.points,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }

  toEntity(dto: CreateWasteTypeDto | UpdateWasteTypeDto): Partial<WasteTypeEntity> {
    return {
      name: dto.name,
      description: dto.description,
      points: dto.points,
    };
  }

  toDto(entity: WasteTypeEntity) {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      points: entity.points,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }
} 