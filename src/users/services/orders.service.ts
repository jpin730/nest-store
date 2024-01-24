import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigType } from '@nestjs/config'
import { Repository } from 'typeorm'
import { UUID } from 'crypto'

import {
  CreateOrderDto,
  PaginatedOrdersDto,
  UpdateOrderDto,
} from '../dtos/order.dto'
import { QueryParamsDto } from '../../common/dtos/query-params.dto'
import { Customer } from '../entities/customer.entity'
import { Order } from '../entities/order.entity'
import config from '../../config'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
  ) {}

  async findAll(queryParams: QueryParamsDto): Promise<PaginatedOrdersDto> {
    const {
      limit = this.appConfig.defaultQueryParams.limit,
      offset = this.appConfig.defaultQueryParams.offset,
    } = queryParams
    const [data, total] = await this.orderRepo.findAndCount({
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

  async findOne(id: UUID): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: { items: { product: true } },
    })
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`)
    }
    return order
  }

  async create(payload: CreateOrderDto): Promise<Order> {
    const order = new Order()
    if (payload.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: payload.customerId },
      })
      order.customer = customer
    }
    return this.orderRepo.save(order)
  }

  async update(id: UUID, payload: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: { items: true },
    })
    if (payload.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: payload.customerId },
      })
      order.customer = customer
    }
    return this.orderRepo.save(order)
  }

  async remove(id: UUID): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: { items: true },
    })
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`)
    }
    return this.orderRepo.remove(order)
  }
}
