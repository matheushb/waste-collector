import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dtos/create-collection.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateCollectionDto } from './dtos/update-collection.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { CollectionFilterParams } from './dtos/find-all-collection.dto';
import { ApiBadRequestExceptionReponse } from '@/common/decorators/exceptions/bad-request-response.decorator';
import { ApiUnauthorizedExceptionReponse } from '@/common/decorators/exceptions/unauthorized-response.decorator';
import { ApiForbiddenExceptionReponse } from '@/common/decorators/exceptions/forbidden-response.decorator';
import { ApiNotFoundExceptionReponse } from '@/common/decorators/exceptions/not-found-response.decorator';
import { Collection } from './entity/collection.entity';
import { NoRoles } from '@/common/decorators/roles/no-roles.decorator';
import {
  RequestUser,
  UserFromRequest,
} from '@/common/decorators/user/user-from-request.decorator';

const route = '/collections';
const routeId = '/collections/:id';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('collections')
@Controller({ path: route, version: '1' })
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  @NoRoles()
  @ApiCreatedResponse({ type: Collection })
  @ApiUnauthorizedExceptionReponse(route)
  @ApiBadRequestExceptionReponse(route)
  async create(
    @Body() createCollectionDto: CreateCollectionDto,
    @UserFromRequest() user: RequestUser,
  ) {
    return this.collectionService.create(createCollectionDto, user.id);
  }

  @Get()
  @NoRoles()
  @ApiOkResponse({ type: [Collection] })
  @ApiUnauthorizedExceptionReponse(route)
  findAll(@Query() params: CollectionFilterParams) {
    return this.collectionService.findAll(params);
  }

  @Get(':id')
  @NoRoles()
  @ApiOkResponse({ type: Collection })
  @ApiUnauthorizedExceptionReponse(routeId)
  @ApiNotFoundExceptionReponse(routeId, 'Collection')
  async findOne(
    @Param('id') id: string,
    @UserFromRequest() user: RequestUser,
  ) {
    const collection = await this.collectionService.findOne(id);

    if (collection.userId !== user.id) {
      throw new ForbiddenException('You can only access your own collections');
    }

    return collection;
  }

  @Patch(':id')
  @NoRoles()
  @ApiCreatedResponse({ type: Collection })
  @ApiUnauthorizedExceptionReponse(routeId)
  @ApiNotFoundExceptionReponse(routeId, 'Collection')
  async update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
    @UserFromRequest() user: RequestUser,
  ) {
    const collection = await this.collectionService.findOne(id);

    if (collection.userId !== user.id) {
      throw new ForbiddenException('You can only update your own collections');
    }

    return this.collectionService.update(id, updateCollectionDto);
  }

  @Delete(':id')
  @NoRoles()
  @ApiUnauthorizedExceptionReponse(routeId)
  @ApiNotFoundExceptionReponse(routeId, 'Collection')
  @ApiNoContentResponse({ description: 'Collection deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id') id: string,
    @UserFromRequest() user: RequestUser,
  ) {
    const collection = await this.collectionService.findOne(id);

    if (collection.userId !== user.id) {
      throw new ForbiddenException('You can only delete your own collections');
    }

    await this.collectionService.delete(id);
  }

  @Get('dashboard/summary')
  @NoRoles()
  @ApiOkResponse()
  @ApiUnauthorizedExceptionReponse(route)
  async getDashboardSummary(@UserFromRequest() user: RequestUser) {
    return this.collectionService.getDashboardSummary(user.id);
  }
} 