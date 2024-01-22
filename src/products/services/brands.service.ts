import { Injectable, NotFoundException } from '@nestjs/common';

import { UUID } from 'crypto';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  findAll(): Promise<Brand[]> {
    return this.brandRepo.find();
  }

  async findOne(id: UUID): Promise<Brand> {
    const brand = await this.brandRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDto): Promise<Brand> {
    const brand = this.brandRepo.create(payload);
    return this.brandRepo.save(brand);
  }

  async update(id: UUID, payload: UpdateBrandDto): Promise<Brand> {
    const brand = await this.brandRepo.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    this.brandRepo.merge(brand, payload);
    return this.brandRepo.save(brand);
  }

  async remove(id: UUID): Promise<Brand> {
    const brand = await this.brandRepo.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    return this.brandRepo.remove(brand);
  }
}
