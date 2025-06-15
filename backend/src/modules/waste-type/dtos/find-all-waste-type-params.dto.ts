import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationParams } from '@/common/decorators/pagination/pagination.decorator';

export class FindAllWasteTypeParamsDto extends PaginationParams {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
} 