import { Injectable, NotFoundException } from '@nestjs/common';

import { UUID } from 'crypto';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: crypto.randomUUID(),
      email: 'user1@mail.com',
      password: '123456',
      role: 'admin',
    },
  ];

  constructor(private productsService: ProductsService) {}

  findAll() {
    return this.users;
  }

  findOne(id: UUID) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    const user = {
      id: crypto.randomUUID(),
      ...payload,
    };
    this.users.push(user);
    return user;
  }

  update(id: UUID, payload: UpdateUserDto) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users[index] = {
      ...this.users[index],
      ...payload,
    };
    return this.users[index];
  }

  remove(id: UUID) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.users.splice(index, 1);
  }

  getOrderByUser(id: UUID): Order {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
