import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EntityProps } from '@/common/types/entity-props.types';

export class Collection {
  @ApiProperty({ example: '8062c43b-339f-4ce6-a5b7-902768c709ae' })
  id: string;

  @ApiProperty({ example: '8062c43b-339f-4ce6-a5b7-902768c709ae' })
  userId: string;

  @ApiProperty({ example: '8062c43b-339f-4ce6-a5b7-902768c709ae' })
  wasteTypeId: string;

  @ApiProperty({ example: 10.5 })
  weight: number;

  @ApiProperty({ example: 100 })
  points: number;

  @ApiProperty({ example: new Date() })
  created_at: Date;

  @ApiProperty({ example: new Date() })
  updated_at: Date;

  constructor(collection: EntityProps<typeof Collection>) {
    this.id = collection.id ?? crypto.randomUUID();
    this.userId = collection.userId;
    this.wasteTypeId = collection.wasteTypeId;
    this.weight = collection.weight;
    this.points = collection.points;
    this.created_at = collection.created_at ?? new Date();
    this.updated_at = collection.updated_at ?? new Date();
  }
}

export class SelectableCollection extends PartialType(Collection) {} 