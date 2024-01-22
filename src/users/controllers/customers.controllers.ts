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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dtos';
import { Customer } from '../entities/customer.entity';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  @ApiResponse({ type: Customer, isArray: true, status: 200 })
  getAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: Customer, status: 200 })
  get(@Param('id', ParseUUIDPipe) id: UUID): Promise<Customer> {
    return this.customersService.findOne(id);
  }

  @Post()
  @ApiResponse({ type: Customer, status: 201 })
  @ApiBody({ type: CreateCustomerDto })
  create(@Body() payload: CreateCustomerDto): Promise<Customer> {
    return this.customersService.create(payload);
  }

  @Put(':id')
  @ApiResponse({ type: Customer, status: 200 })
  @ApiBody({ type: UpdateCustomerDto })
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  @ApiResponse({ type: Customer, status: 200 })
  delete(@Param('id', ParseUUIDPipe) id: UUID): Promise<Customer> {
    return this.customersService.remove(id);
  }
}
