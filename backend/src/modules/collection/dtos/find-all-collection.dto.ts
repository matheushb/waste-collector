import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationParams } from '@/common/decorators/pagination/pagination.decorator';
import { COLLECTION_SELECT, CollectionSelect } from '../enums/collection-select.enum';
import { Transform } from 'class-transformer';
import { SelectSanatizer } from '@/common/select/select-sanitizer.transformer';

export class CollectionFilterParams extends PaginationParams {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  wasteTypeId?: string;

  @ApiPropertyOptional({
    enum: COLLECTION_SELECT,
    enumName: 'CollectionSelect',
    isArray: true,
  })
  @IsOptional()
  @Transform(SelectSanatizer)
  select?: CollectionSelect[];
} 