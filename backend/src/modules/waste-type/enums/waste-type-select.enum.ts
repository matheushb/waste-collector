import { ObjectValues } from '@/common/types/object-keys.types';

export const WASTE_TYPE_SELECT = {
  ID: 'id',
  NAME: 'name',
  DESCRIPTION: 'description',
  POINTS: 'points',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

export type WasteTypeSelect = ObjectValues<typeof WASTE_TYPE_SELECT>; 