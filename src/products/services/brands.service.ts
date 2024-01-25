import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigType } from '@nestjs/config'
import { Repository } from 'typeorm'
import { UUID } from 'crypto'

import { Brand } from '../entities/brand.entity'
import {
  CreateBrandDto,
  PaginatedBrandsDto,
  UpdateBrandDto,
} from '../dtos/brands.dto'
import { QueryParamsDto } from 'src/common/dtos/query-params.dto'
import config from '../../config'

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @Inject(config.KEY) private appConfig: ConfigType<typeof config>,
  ) {}

  async findAll(queryParams: QueryParamsDto): Promise<PaginatedBrandsDto> {
    const {
      limit = this.appConfig.defaultQueryParams.limit,
      offset = this.appConfig.defaultQueryParams.offset,
    } = queryParams
    const [data, total] = await this.brandRepo.findAndCount({
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

  async findOne(id: UUID): Promise<Brand> {
    const brand = await this.brandRepo.findOne({
      where: { id },
      relations: { products: true },
    })
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`)
    }
    return brand
  }

  create(payload: CreateBrandDto): Promise<Brand> {
    const brand = this.brandRepo.create(payload)
    return this.brandRepo.save(brand)
  }

  async update(id: UUID, payload: UpdateBrandDto): Promise<Brand> {
    const brand = await this.brandRepo.findOne({
      where: { id },
      relations: { products: true },
    })
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`)
    }
    this.brandRepo.merge(brand, payload)
    return this.brandRepo.save(brand)
  }

  async remove(id: UUID): Promise<Brand> {
    const brand = await this.brandRepo.findOne({ where: { id } })
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`)
    }
    return this.brandRepo.remove(brand)
  }
}
