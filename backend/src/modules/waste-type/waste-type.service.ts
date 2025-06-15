import { Injectable, Inject } from '@nestjs/common';
import { WasteTypeRepositoryInterface, WASTE_TYPE_REPOSITORY } from './repository/waste-type.repository.interface';
import { WasteTypeEntity } from './entity/waste-type.entity';
import { CreateWasteTypeDto } from './dtos/create-waste-type.dto';
import { UpdateWasteTypeDto } from './dtos/update-waste-type.dto';
import { WasteTypeFindAllParams } from './dtos/waste-type-find-all.params';
import { WasteTypePrismaMapper } from './mapper/waste-type-prisma.mapper';
import { FindAllResponse } from '@/interfaces/find-all-response.interface';
import { PaginationParams } from '@/common/decorators/pagination/pagination.decorator';
import { WASTE_TYPE_MAPPER } from './mapper/waste-type.mapper';

@Injectable()
export class WasteTypeService {
  constructor(
    @Inject(WASTE_TYPE_REPOSITORY)
    private readonly repository: WasteTypeRepositoryInterface,
    @Inject(WASTE_TYPE_MAPPER)
    private readonly mapper: WasteTypePrismaMapper,
  ) {}

  async create(dto: CreateWasteTypeDto): Promise<WasteTypeEntity> {
    const entity = this.mapper.toEntity(dto);
    return this.repository.create(entity as WasteTypeEntity);
  }

  async findOne(id: string): Promise<WasteTypeEntity> {
    return this.repository.findOne(id);
  }

  async findAll(
    params: WasteTypeFindAllParams & PaginationParams,
  ): Promise<FindAllResponse<Partial<WasteTypeEntity>>> {
    return this.repository.findAll(params);
  }

  async update(id: string, dto: UpdateWasteTypeDto): Promise<WasteTypeEntity> {
    const entity = await this.repository.findOne(id);
    if (!entity) return null;
    const updatedEntity = this.mapper.toEntity(dto);
    return this.repository.update({ ...entity, ...updatedEntity } as WasteTypeEntity);
  }

  async delete(id: string): Promise<WasteTypeEntity> {
    return this.repository.delete(id);
  }
} 