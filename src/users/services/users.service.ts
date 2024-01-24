import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UUID } from 'crypto'

import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto'
import { Customer } from '../entities/customer.entity'
import { Order } from '../entities/order.entity'
import { User } from '../entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepo.find({ relations: { customer: true } })
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
