import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigType } from '@nestjs/config'
import { Repository } from 'typeorm'
import { UUID } from 'crypto'

import {
  CreateCategoryDto,
  PaginatedCategoriesDto,
  UpdateCategoryDto,
} from '../dtos/categories.dto'
import { Category } from '../entities/category.entity'
import { QueryParamsDto } from '../../common/dtos/query-params.dto'
import config from '../../config'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
  ) {}

  async findAll(queryParams: QueryParamsDto): Promise<PaginatedCategoriesDto> {
    const {
      limit = this.appConfig.defaultQueryParams.limit,
      offset = this.appConfig.defaultQueryParams.offset,
    } = queryParams
    const [data, total] = await this.categoryRepo.findAndCount({
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

  async findOne(id: UUID): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: { products: true },
    })
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`)
    }
    return category
  }

  create(payload: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepo.create(payload)
    return this.categoryRepo.save(category)
  }

  async update(id: UUID, payload: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { id } })
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`)
    }
    this.categoryRepo.merge(category, payload)
    return this.categoryRepo.save(category)
  }

  async remove(id: UUID): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { id } })
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`)
    }
    return this.categoryRepo.remove(category)
  }
}
