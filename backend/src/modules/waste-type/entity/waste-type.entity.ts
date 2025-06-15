import { ApiProperty } from '@nestjs/swagger';
import { EntityProps } from '@/common/types/entity-props.types';

export class WasteTypeEntity {
  @ApiProperty({ example: '8062c43b-339f-4ce6-a5b7-902768c709ae' })
  id: string;

  @ApiProperty({ example: 'Plastic' })
  name: string;

  @ApiProperty({ example: 'Recyclable plastic materials' })
  description: string;

  @ApiProperty({ example: 10 })
  points: number;

  @ApiProperty({ example: new Date() })
  created_at: Date;

  @ApiProperty({ example: new Date() })
  updated_at: Date;

  constructor(wasteType: EntityProps<typeof WasteTypeEntity>) {
    this.id = wasteType.id ?? crypto.randomUUID();
    this.name = wasteType.name;
    this.description = wasteType.description;
    this.points = wasteType.points;
    this.created_at = wasteType.created_at ?? new Date();
    this.updated_at = wasteType.updated_at ?? new Date();
  }
} 