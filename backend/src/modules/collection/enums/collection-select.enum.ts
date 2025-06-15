import { ObjectValues } from '@/common/types/object-keys.types';

export const COLLECTION_SELECT = {
  ID: 'id',
  USER_ID: 'userId',
  WASTE_TYPE_ID: 'wasteTypeId',
  WEIGHT: 'weight',
  POINTS: 'points',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

export type CollectionSelect = ObjectValues<typeof COLLECTION_SELECT>; 