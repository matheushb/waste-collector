import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class WasteTypeFindAllParams {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
} 