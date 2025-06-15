import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { WasteTypeService } from './waste-type.service';
import { CreateWasteTypeDto } from './dtos/create-waste-type.dto';
import { UpdateWasteTypeDto } from './dtos/update-waste-type.dto';
import { WasteTypeFindAllParams } from './dtos/waste-type-find-all.params';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationParams } from '@/common/decorators/pagination/pagination.decorator';
import { WasteTypeEntity } from './entity/waste-type.entity';
import { FindAllResponse } from '@/interfaces/find-all-response.interface';

@ApiTags('waste-types')
@Controller('waste-types')
export class WasteTypeController {
  constructor(private readonly wasteTypeService: WasteTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new waste type' })
  @ApiResponse({ type: WasteTypeEntity })
  create(@Body() createWasteTypeDto: CreateWasteTypeDto) {
    return this.wasteTypeService.create(createWasteTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all waste types' })
  @ApiResponse({ type: [WasteTypeEntity] })
  findAll(
    @Query() params: WasteTypeFindAllParams & PaginationParams,
  ): Promise<FindAllResponse<Partial<WasteTypeEntity>>> {
    return this.wasteTypeService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a waste type by id' })
  @ApiResponse({ type: WasteTypeEntity })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const wasteType = await this.wasteTypeService.findOne(id);
    if (!wasteType) {
      throw new NotFoundException(`Waste type with id ${id} not found`);
    }
    return wasteType;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a waste type' })
  @ApiResponse({ type: WasteTypeEntity })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateWasteTypeDto: UpdateWasteTypeDto,
  ) {
    const wasteType = await this.wasteTypeService.update(id, updateWasteTypeDto);
    if (!wasteType) {
      throw new NotFoundException(`Waste type with id ${id} not found`);
    }
    return wasteType;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a waste type' })
  @ApiResponse({ type: WasteTypeEntity })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const wasteType = await this.wasteTypeService.delete(id);
    if (!wasteType) {
      throw new NotFoundException(`Waste type with id ${id} not found`);
    }
    return wasteType;
  }
} 