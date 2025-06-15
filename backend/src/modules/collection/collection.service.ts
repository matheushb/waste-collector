import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dtos/create-collection.dto';
import { UpdateCollectionDto } from './dtos/update-collection.dto';
import { COLLECTION_REPOSITORY, CollectionRepositoryInterface } from './repository/collection.repository.interface';
import { Collection } from './entity/collection.entity';
import { CollectionFilterParams } from './dtos/find-all-collection.dto';
import { WasteTypeService } from '../waste-type/waste-type.service';

@Injectable()
export class CollectionService {
  constructor(
    @Inject(COLLECTION_REPOSITORY)
    private readonly collectionRepository: CollectionRepositoryInterface,
    private readonly wasteTypeService: WasteTypeService,
  ) {}

  async create(createCollectionDto: CreateCollectionDto, userId: string) {
    const wasteType = await this.wasteTypeService.findOne(
      createCollectionDto.wasteTypeId,
    );

    if (!wasteType) {
      throw new NotFoundException('Waste type not found');
    }

    const points = Math.floor(createCollectionDto.weight * wasteType.points);

    const collection = new Collection({
      userId,
      wasteTypeId: createCollectionDto.wasteTypeId,
      weight: createCollectionDto.weight,
      points,
    });

    return this.collectionRepository.create(collection);
  }

  async findAll(params: CollectionFilterParams) {
    return this.collectionRepository.findAll(params);
  }

  async findOne(id: string) {
    const collection = await this.collectionRepository.findOne(id);

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    return collection;
  }

  async update(id: string, updateCollectionDto: UpdateCollectionDto) {
    const collection = await this.findOne(id);

    if (updateCollectionDto.wasteTypeId) {
      const wasteType = await this.wasteTypeService.findOne(
        updateCollectionDto.wasteTypeId,
      );

      if (!wasteType) {
        throw new NotFoundException('Waste type not found');
      }

      const weight = updateCollectionDto.weight ?? collection.weight;
      const points = Math.floor(weight * wasteType.points);

      Object.assign(collection, {
        wasteTypeId: updateCollectionDto.wasteTypeId,
        weight,
        points,
      });
    } else if (updateCollectionDto.weight) {
      const wasteType = await this.wasteTypeService.findOne(collection.wasteTypeId);
      const points = Math.floor(updateCollectionDto.weight * wasteType.points);

      Object.assign(collection, {
        weight: updateCollectionDto.weight,
        points,
      });
    }

    return this.collectionRepository.update(collection);
  }

  async delete(id: string) {
    const collection = await this.findOne(id);
    await this.collectionRepository.delete(id);
  }

  async findByUserId(userId: string) {
    return this.collectionRepository.findByUserId(userId);
  }

  async getDashboardSummary(userId: string) {
    const collections = await this.findByUserId(userId);

    const totalWeight = collections.reduce((acc, curr) => acc + curr.weight, 0);
    const totalPoints = collections.reduce((acc, curr) => acc + curr.points, 0);

    return {
      totalWeight,
      totalPoints,
      collectionsCount: collections.length,
    };
  }
} 