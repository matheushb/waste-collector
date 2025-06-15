import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';

import {
  FindAllUserResponse,
  UserFilterParams,
} from './dtos/find-all-user.dto';
import { Role } from './enums/role.enum';
import { ApiBadRequestExceptionReponse } from '@/common/decorators/exceptions/bad-request-response.decorator';
import { ApiUnauthorizedExceptionReponse } from '@/common/decorators/exceptions/unauthorized-response.decorator';
import { ApiForbiddenExceptionReponse } from '@/common/decorators/exceptions/forbidden-response.decorator';
import { ApiNotFoundExceptionReponse } from '@/common/decorators/exceptions/not-found-response.decorator';
import { User } from './entity/user.entity';
import { Roles } from '@/common/decorators/roles/roles.decorator';
import { NoRoles } from '@/common/decorators/roles/no-roles.decorator';
import {
  RequestUser,
  UserFromRequest,
} from '@/common/decorators/user/user-from-request.decorator';
import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const route = '/users';
const routeId = '/users/:id';

class UpdatePointsDto {
  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  points: number;
}

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.USER, Role.ADMIN) // Deixei a role user aqui pra facilitar o uso da Api, porém, o ideal é que USER não tenha acesso a esses endpoints
@ApiTags('users')
@Controller({ path: route, version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiCreatedResponse({ type: User })
  @ApiUnauthorizedExceptionReponse(route)
  @ApiForbiddenExceptionReponse(route)
  @ApiBadRequestExceptionReponse(route)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOkResponse({ type: FindAllUserResponse })
  @ApiUnauthorizedExceptionReponse(route)
  @ApiForbiddenExceptionReponse(route)
  findAll(@Query() params: UserFilterParams) {
    return this.userService.findAll(params);
  }

  @Get(':id')
  @NoRoles()
  @ApiOkResponse({ type: User })
  @ApiUnauthorizedExceptionReponse(routeId)
  @ApiNotFoundExceptionReponse(routeId, 'User')
  async findOne(
    @Param('id') id: string,
    @UserFromRequest() user: RequestUser,
  ) {
    if (user.role !== Role.ADMIN && user.id !== id) {
      throw new ForbiddenException('You can only access your own profile');
    }

    return this.userService.findOne(id);
  }

  @Patch(':id')
  @NoRoles()
  @ApiCreatedResponse({ type: User })
  @ApiUnauthorizedExceptionReponse(routeId)
  @ApiForbiddenExceptionReponse(routeId)
  @ApiNotFoundExceptionReponse(routeId, 'User')
  @ApiBadRequestExceptionReponse(routeId)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UserFromRequest() user: RequestUser,
  ) {
    if (user.role !== Role.ADMIN && user.id !== id) {
      throw new ForbiddenException('You can only update your own profile');
    }

    return this.userService.update(id, updateUserDto);
  }

  @NoRoles()
  @Patch('update/me')
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestExceptionReponse(route)
  @ApiUnauthorizedExceptionReponse(route)
  async updateMe(
    @UserFromRequest() user: RequestUser,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.update(user.id, body);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiNoContentResponse()
  @ApiUnauthorizedExceptionReponse(routeId)
  @ApiForbiddenExceptionReponse(routeId)
  @ApiNotFoundExceptionReponse(routeId, 'User')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }

  @Patch(':id/points')
  @Roles(Role.ADMIN)
  @ApiCreatedResponse({ type: User })
  @ApiUnauthorizedExceptionReponse(routeId)
  @ApiForbiddenExceptionReponse(routeId)
  @ApiNotFoundExceptionReponse(routeId, 'User')
  @ApiBadRequestExceptionReponse(routeId)
  async updatePoints(
    @Param('id') id: string,
    @Body() updatePointsDto: UpdatePointsDto,
  ) {
    return this.userService.updatePoints(id, updatePointsDto.points);
  }
}
