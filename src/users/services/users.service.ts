import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigType } from '@nestjs/config'
import { Repository } from 'typeorm'
import { UUID } from 'crypto'

import {
  CreateUserDto,
  PaginatedUsersDto,
  UpdateUserDto,
} from '../dtos/users.dto'
import { QueryParamsDto } from '../../common/dtos/query-params.dto'
import { Customer } from '../entities/customer.entity'
import { Order } from '../entities/order.entity'
import { User } from '../entities/user.entity'
import config from '../../config'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
  ) {}

  async findAll(queryParams: QueryParamsDto): Promise<PaginatedUsersDto> {
    const {
      limit = this.appConfig.defaultQueryParams.limit,
      offset = this.appConfig.defaultQueryParams.offset,
    } = queryParams
    const [data, total] = await this.userRepo.findAndCount({
      relations: { customer: true },
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

  async findOne(id: UUID): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: { customer: true },
    })
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return user
  }

  async create(payload: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(payload)
    if (payload.customerId) {
      user.customer = await this.customerRepo.findOne({
        where: { id: payload.customerId },
      })
    }
    return this.userRepo.save(user)
  }

  async update(id: UUID, payload: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: { customer: true },
    })
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    if (payload.customerId) {
      user.customer = await this.customerRepo.findOne({
        where: { id: payload.customerId },
      })
    }
    this.userRepo.merge(user, payload)
    return this.userRepo.save(user)
  }

  async remove(id: UUID): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: { customer: true },
    })
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return this.userRepo.remove(user)
  }

  // TODO: Implement the following methods
  // async getOrderByUser(id: UUID): Promise<Order> {
  //   const user = await this.userRepo.findOne({
  //     where: { id },
  //     relations: { customer: true },
  //   });
  //   if (!user) {
  //     throw new NotFoundException(`User with id ${id} not found`);
  //   }
  //   return this.orderRepo.findOne({ where: { customer: user.customer } });
  // }
}
