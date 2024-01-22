import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { Product } from '../entities/product.entity';
import { BrandsService } from './brands.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandService: BrandsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepo.find({ relations: ['brand'] });
  }

  async findOne(id: UUID): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand'],
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(payload);
    if (payload.brandId) {
      product.brand = await this.brandService.findOne(payload.brandId);
    }
    return this.productRepo.save(product);
  }

  async update(id: UUID, payload: UpdateProductDto): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    if (payload.brandId) {
      product.brand = await this.brandService.findOne(payload.brandId);
    }
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  async remove(id: UUID): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return this.productRepo.remove(product);
  }
}
