import { Injectable, NotFoundException } from '@nestjs/common';

import { UUID } from 'crypto';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dtos';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: crypto.randomUUID(),
      name: 'Customer 1',
      phone: '+123 456 7890',
    },
  ];

  findAll(): Customer[] {
    return this.customers;
  }

  findOne(id: UUID): Customer {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto): Customer {
    const customer = {
      id: crypto.randomUUID(),
      ...payload,
    };
    this.customers.push(customer);
    return customer;
  }

  update(id: UUID, payload: UpdateCustomerDto): Customer {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    this.customers[index] = {
      ...this.customers[index],
      ...payload,
    };
    return this.customers[index];
  }

  remove(id: UUID): Customer {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return this.customers.splice(index, 1).at(0);
  }
}
