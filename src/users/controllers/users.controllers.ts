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
import { ApiTags } from '@nestjs/swagger';

import { UUID } from 'crypto';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: UUID): User {
    return this.usersService.findOne(id);
  }

  @Get(':id/orders')
  getOrderByUserId(@Param('id', ParseUUIDPipe) id: UUID): Promise<Order> {
    return this.usersService.getOrderByUser(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto): User {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateUserDto,
  ): User {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: UUID): User {
    return this.usersService.remove(id);
  }
}
