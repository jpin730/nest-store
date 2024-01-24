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

import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto'
import { OrderItem } from '../entities/order-item.entity'
import { OrderItemsService } from '../services/order-items.service'

@ApiTags('Order items')
@Controller('order-items')
export class OrderItemsController {
  constructor(private itemsService: OrderItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all order items' })
  @ApiResponse({ type: OrderItem, isArray: true, status: 200 })
  findAll(): Promise<OrderItem[]> {
    return this.itemsService.getAllOrderItems()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order item' })
  @ApiResponse({ type: OrderItem, status: 200 })
  get(@Param('id', ParseUUIDPipe) id: UUID): Promise<OrderItem> {
    return this.itemsService.getOrderItem(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create an order item' })
  @ApiResponse({
    type: OrderItem,
    status: 201,
    description: 'Create an order item',
  })
  create(@Body() payload: CreateOrderItemDto): Promise<OrderItem> {
    return this.itemsService.create(payload)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an order item' })
  @ApiResponse({
    type: OrderItem,
    status: 200,
    description: 'Update an order item',
  })
  @ApiBody({ type: UpdateOrderItemDto })
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    return this.itemsService.update(id, payload)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order item' })
  @ApiResponse({
    type: OrderItem,
    status: 200,
    description: 'Delete an order item',
  })
  remove(@Param('id', ParseUUIDPipe) id: UUID): Promise<OrderItem> {
    return this.itemsService.remove(id)
  }
}
