import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigType } from '@nestjs/config'
import { Repository } from 'typeorm'
import { UUID } from 'crypto'

import {
  CreateCustomerDto,
  PaginatedCustomersDto,
  UpdateCustomerDto,
} from '../dtos/customers.dto'
import { QueryParamsDto } from '../../common/dtos/query-params.dto'
import { Customer } from '../entities/customer.entity'
import config from '../../config'

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
  ) {}

  async findAll(queryParams: QueryParamsDto): Promise<PaginatedCustomersDto> {
    const {
      limit = this.appConfig.defaultQueryParams.limit,
      offset = this.appConfig.defaultQueryParams.offset,
    } = queryParams
    const [data, total] = await this.customerRepo.findAndCount({
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    })
    return {
      data,
      limit: limit,
      offset: offset,
      total,
    }
  }

  async findOne(id: UUID): Promise<Customer> {
    const customer = await this.customerRepo.findOne({ where: { id } })
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`)
    }
    return customer
  }

  create(payload: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepo.create(payload)
    return this.customerRepo.save(customer)
  }

  async update(id: UUID, payload: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepo.findOne({ where: { id } })
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`)
    }
    this.customerRepo.merge(customer, payload)
    return this.customerRepo.save(customer)
  }

  async remove(id: UUID): Promise<Customer> {
    const customer = await this.customerRepo.findOne({ where: { id } })
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`)
    }
    return this.customerRepo.remove(customer)
  }
}
