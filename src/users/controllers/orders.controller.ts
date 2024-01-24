import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UUID } from 'crypto'

import {
  ApiQueryFilters,
  QueryParamsDto,
} from '../../common/dtos/query-params.dto'
import {
  CreateOrderDto,
  PaginatedOrdersDto,
  UpdateOrderDto,
} from '../dtos/order.dto'
import { OrdersService } from '../services/orders.service'
import { Order } from '../entities/order.entity'

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ type: PaginatedOrdersDto, status: 200 })
  @ApiQueryFilters()
  findAll(@Query() queryParams: QueryParamsDto): Promise<PaginatedOrdersDto> {
    return this.orderService.findAll(queryParams)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order' })
  @ApiResponse({ type: Order, status: 200 })
  get(@Param('id', ParseUUIDPipe) id: UUID): Promise<Order> {
    return this.orderService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create an order' })
  @ApiResponse({ type: Order, status: 201 })
  @ApiBody({ type: CreateOrderDto })
  create(@Body() payload: CreateOrderDto): Promise<Order> {
    return this.orderService.create(payload)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an order' })
  @ApiResponse({ type: Order, status: 200 })
  @ApiBody({ type: UpdateOrderDto })
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, payload)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({ type: Order, status: 200 })
  remove(@Param('id', ParseUUIDPipe) id: UUID): Promise<Order> {
    return this.orderService.remove(id)
  }
}
