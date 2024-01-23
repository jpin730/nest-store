import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { User } from '../entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ type: User, isArray: true, status: 200 })
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user' })
  @ApiResponse({ type: User, status: 200 })
  get(@Param('id', ParseUUIDPipe) id: UUID): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ type: User, status: 201 })
  @ApiBody({ type: CreateUserDto })
  create(@Body() payload: CreateUserDto): Promise<User> {
    return this.usersService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ type: User, status: 200 })
  @ApiBody({ type: UpdateUserDto })
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ type: User, status: 200 })
  delete(@Param('id', ParseUUIDPipe) id: UUID): Promise<User> {
    return this.usersService.remove(id);
  }

  // TODO: Uncomment this code
  // @Get(':id/orders')
  // @ApiOperation({ summary: 'Get a user orders' })
  // @ApiResponse({ type: Order, status: 200 })
  // getOrderByUserId(@Param('id', ParseUUIDPipe) id: UUID): Promise<Order> {
  //   return this.usersService.getOrderByUser(id);
  // }
}
