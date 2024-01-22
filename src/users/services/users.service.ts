import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { CustomersService } from './customers.service';
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private productsService: ProductsService,
    private customerService: CustomersService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepo.find({ relations: ['customer'] });
  }

  async findOne(id: UUID): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['customer'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async create(payload: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(payload);
    if (payload.customerId) {
      user.customer = await this.customerService.findOne(payload.customerId);
    }
    return this.userRepo.save(user);
  }

  async update(id: UUID, payload: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['customer'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (payload.customerId) {
      user.customer = await this.customerService.findOne(payload.customerId);
    }
    this.userRepo.merge(user, payload);
    return this.userRepo.save(user);
  }

  async remove(id: UUID): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['customer'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.userRepo.remove(user);
  }

  async getOrderByUser(id: UUID): Promise<Order> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
