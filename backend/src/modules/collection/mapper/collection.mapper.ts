import { Mapper } from '@/common/mapper/mapper';
import { SelectableCollection, Collection } from '../entity/collection.entity';
import { WasteCollection } from '@prisma/client';

export const COLLECTION_MAPPER = 'COLLECTION_MAPPER';

export interface CollectionMapper extends Mapper<Collection, WasteCollection> {
  mapToSelectableEntity(selectable: Partial<WasteCollection>): SelectableCollection;
} 