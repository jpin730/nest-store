import { Injectable, NotFoundException } from '@nestjs/common';

import { UUID } from 'crypto';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: crypto.randomUUID(),
      name: 'Product 1',
      description: 'bla bla',
      price: 122,
      image: '',
      stock: 12,
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: UUID): Product {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto): Product {
    const product = {
      id: crypto.randomUUID(),
      ...payload,
    };
    this.products.push(product);
    return product;
  }

  update(id: UUID, payload: UpdateProductDto): Product {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products[index] = {
      ...this.products[index],
      ...payload,
    };
    return this.products[index];
  }

  remove(id: UUID): Product {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return this.products.splice(index, 1).at(0);
  }
}
