import { Repository, RepositoryOptions } from '../../../interfaces/repository.interface';
import { Collection } from '../entity/collection.entity';
import { CollectionFilterParams } from '../dtos/find-all-collection.dto';

export const COLLECTION_REPOSITORY = 'COLLECTION_REPOSITORY';

export interface CollectionRepositoryInterface
  extends Repository<Collection, CollectionFilterParams> {
  findByUserId(userId: string, opts?: RepositoryOptions): Promise<Collection[]>;
} 