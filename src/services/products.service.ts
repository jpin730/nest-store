import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '../entities/product.entity';

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

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  create(payload: any) {
    const product = {
      id: crypto.randomUUID(),
      ...payload,
    };
    this.products.push(product);
    return product;
  }

  update(id: string, payload: any) {
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

  remove(id: string) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return this.products.splice(index, 1);
  }
}
