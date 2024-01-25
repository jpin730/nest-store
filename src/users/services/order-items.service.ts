import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigType } from '@nestjs/config'
import { Repository } from 'typeorm'
import { UUID } from 'crypto'

import {
  CreateOrderItemDto,
  PaginatedOrderItemsDto,
  UpdateOrderItemDto,
} from '../dtos/order-item.dto'
import { Order } from '../entities/order.entity'
import { OrderItem } from '../entities/order-item.entity'
import { Product } from '../../products/entities/product.entity'
import config from '../../config'
import { QueryParamsDto } from 'src/common/dtos/query-params.dto'

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
  ) {}

  async getAllOrderItems(
    queryParams: QueryParamsDto,
  ): Promise<PaginatedOrderItemsDto> {
    const {
      limit = this.appConfig.defaultQueryParams.limit,
      offset = this.appConfig.defaultQueryParams.offset,
    } = queryParams
    const [data, total] = await this.itemRepo.findAndCount({
      take: limit,
      skip: offset,
      order: { createAt: 'DESC' },
    })
    return {
      data,
      limit: limit,
      offset: offset,
      total,
    }
  }

  async getOrderItem(id: UUID): Promise<OrderItem> {
    const item = await this.itemRepo.findOne({
      where: { id },
      relations: { order: true, product: true },
    })
    if (!item) {
      throw new NotFoundException(`Order item with id ${id} not found`)
    }
    return item
  }

  async create(payload: CreateOrderItemDto): Promise<OrderItem> {
    const order = await this.orderRepo.findOne({
      where: { id: payload.orderId },
    })
    if (!order) {
      throw new NotFoundException(`Order with id ${payload.orderId} not found`)
    }
    const product = await this.productRepo.findOne({
      where: { id: payload.productId },
    })
    if (!product) {
      throw new NotFoundException(
        `Product with id ${payload.productId} not found`,
      )
    }
    const item = new OrderItem()
    item.order = order
    item.product = product
    item.quantity = payload.quantity
    return this.itemRepo.save(item)
  }

  async update(id: UUID, payload: UpdateOrderItemDto): Promise<OrderItem> {
    const item = await this.itemRepo.findOne({
      where: { id },
      relations: { order: true, product: true },
    })
    if (!item) {
      throw new NotFoundException(`Order item with id ${id} not found`)
    }
    this.itemRepo.merge(item, payload)
    return this.itemRepo.save(item)
  }

  async remove(id: UUID): Promise<OrderItem> {
    const item = await this.itemRepo.findOne({
      where: { id },
      relations: { order: true, product: true },
    })
    if (!item) {
      throw new NotFoundException(`Order item with id ${id} not found`)
    }
    return this.itemRepo.remove(item)
  }
}
