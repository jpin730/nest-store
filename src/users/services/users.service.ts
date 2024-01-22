import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private productsService: ProductsService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(id: UUID): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(payload);
    return this.userRepo.save(user);
  }

  async update(id: UUID, payload: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.userRepo.merge(user, payload);
    return this.userRepo.save(user);
  }

  async remove(id: UUID): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
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
