import { Mapper } from '@/common/mapper/mapper';
import { WasteTypeEntity } from '../entity/waste-type.entity';

export const WASTE_TYPE_MAPPER = 'WASTE_TYPE_MAPPER';

export interface WasteTypeMapper<E> extends Mapper<WasteTypeEntity, E> {} 