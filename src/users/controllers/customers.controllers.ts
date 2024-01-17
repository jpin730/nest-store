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

import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dtos';
import { Customer } from '../entities/customer.entity';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  getAll(): Customer[] {
    return this.customersService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: UUID): Customer {
    return this.customersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto): Customer {
    return this.customersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateCustomerDto,
  ): Customer {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: UUID): Customer {
    return this.customersService.remove(id);
  }
}
