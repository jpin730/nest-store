import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UUID } from 'crypto'

import {
  CreateCustomerDto,
  PaginatedCustomersDto,
  UpdateCustomerDto,
} from '../dtos/customers.dto'
import {
  ApiQueryFilters,
  QueryParamsDto,
} from '../../common/dtos/query-params.dto'
import { CustomersService } from '../services/customers.service'
import { Customer } from '../entities/customer.entity'

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({ type: PaginatedCustomersDto, status: 200 })
  @ApiQueryFilters()
  getAll(@Query() queryParams: QueryParamsDto): Promise<PaginatedCustomersDto> {
    return this.customersService.findAll(queryParams)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer' })
  @ApiResponse({ type: Customer, status: 200 })
  get(@Param('id', ParseUUIDPipe) id: UUID): Promise<Customer> {
    return this.customersService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create a customer' })
  @ApiResponse({ type: Customer, status: 201 })
  @ApiBody({ type: CreateCustomerDto })
  create(@Body() payload: CreateCustomerDto): Promise<Customer> {
    return this.customersService.create(payload)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a customer' })
  @ApiResponse({ type: Customer, status: 200 })
  @ApiBody({ type: UpdateCustomerDto })
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.update(id, payload)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer' })
  @ApiResponse({ type: Customer, status: 200 })
  delete(@Param('id', ParseUUIDPipe) id: UUID): Promise<Customer> {
    return this.customersService.remove(id)
  }
}
