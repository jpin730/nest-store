import { ConfigType } from '@nestjs/config'
import { In, Repository } from 'typeorm'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UUID } from 'crypto'

import { Brand } from '../entities/brand.entity'
import { Category } from '../entities/category.entity'
import {
  CreateProductDto,
  PaginatedProductsDto,
  UpdateProductDto,
} from '../dtos/products.dto'
import { Product } from '../entities/product.entity'
import { QueryParamsDto } from '../../common/dtos/query-params.dto'
import config from '../../config'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
  ) {}

  async findAll(queryParams: QueryParamsDto): Promise<PaginatedProductsDto> {
    const {
      limit = this.appConfig.defaultQueryParams.limit,
      offset = this.appConfig.defaultQueryParams.offset,
    } = queryParams
    const [data, total] = await this.productRepo.findAndCount({
      relations: { brand: true, categories: true },
      take: limit,
      skip: offset,
      order: { createAt: 'DESC' },
    })
    return {
      data,
      limit: limit,
      offset: offset,
      total,
    }
  }

  async findOne(id: UUID): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: { brand: true, categories: true },
    })
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }
    return product
  }

  async create(payload: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(payload)
    if (payload.brandId) {
      product.brand = await this.brandRepo.findOne({
        where: { id: payload.brandId },
      })
    }
    if (payload.categoryIds) {
      product.categories = await this.categoryRepo.findBy({
        id: In(payload.categoryIds),
      })
    }
    return this.productRepo.save(product)
  }

  async update(id: UUID, payload: UpdateProductDto): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: { brand: true, categories: true },
    })
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }
    if (payload.brandId) {
      product.brand = await this.brandRepo.findOne({
        where: { id: payload.brandId },
      })
    }
    if (payload.categoryIds) {
      product.categories = await this.categoryRepo.findBy({
        id: In(payload.categoryIds),
      })
    }
    this.productRepo.merge(product, payload)
    return this.productRepo.save(product)
  }

  async remove(id: UUID): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: { brand: true, categories: true },
    })
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }
    return this.productRepo.remove(product)
  }

  async addCategoryByProduct(
    productId: UUID,
    categoryId: UUID,
  ): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: { brand: true, categories: true },
    })
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`)
    }
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    })
    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`)
    }
    product.categories.push(category)
    return this.productRepo.save(product)
  }

  async removeCategoryByProduct(
    productId: UUID,
    categoryId: UUID,
  ): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: { brand: true, categories: true },
    })
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`)
    }
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    )
    return this.productRepo.save(product)
  }
}
