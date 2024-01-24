import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UUID } from 'crypto'

import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto'
import { Order } from '../entities/order.entity'
import { OrdersService } from '../services/orders.service'

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ type: Order, isArray: true, status: 200 })
  findAll(): Promise<Order[]> {
    return this.orderService.findAll()
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
