import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsInt, IsOptional, IsString, Matches, Min } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsOptional()
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Name must contain only letters',
  })
  @Transform(({ value }: { value: string }) => value.trim())
  @ApiPropertyOptional({ example: 'John Doe' })
  name?: string;

  @IsEmail()
  @ApiProperty({ example: 'johndoe@mail.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;

  @ApiPropertyOptional({ enum: Role, example: Role.USER })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  points?: number;
}
