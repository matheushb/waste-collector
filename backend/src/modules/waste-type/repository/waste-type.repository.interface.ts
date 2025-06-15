import { Repository } from '@/interfaces/repository.interface';
import { WasteTypeEntity } from '../entity/waste-type.entity';
import { WasteTypeFindAllParams } from '../dtos/waste-type-find-all.params';

export const WASTE_TYPE_REPOSITORY = 'WASTE_TYPE_REPOSITORY';
export interface WasteTypeRepositoryInterface extends Repository<WasteTypeEntity, WasteTypeFindAllParams> {} 