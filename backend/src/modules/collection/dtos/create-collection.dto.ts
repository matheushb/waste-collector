import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateCollectionDto {
  @ApiProperty({ example: '8062c43b-339f-4ce6-a5b7-902768c709ae' })
  @IsString()
  @IsNotEmpty()
  wasteTypeId: string;

  @ApiProperty({ example: 10.5 })
  @IsNumber()
  @Min(0)
  weight: number;
} 