import { Injectable, NotFoundException } from '@nestjs/common';

import { UUID } from 'crypto';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: crypto.randomUUID(),
      name: 'Brand 1',
      image: '',
    },
  ];

  findAll(): Brand[] {
    return this.brands;
  }

  findOne(id: UUID): Brand {
    const brand = this.brands.find((item) => item.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDto): Brand {
    const brand = {
      id: crypto.randomUUID(),
      ...payload,
    };
    this.brands.push(brand);
    return brand;
  }

  update(id: UUID, payload: UpdateBrandDto): Brand {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    this.brands[index] = {
      ...this.brands[index],
      ...payload,
    };
    return this.brands[index];
  }

  remove(id: UUID): Brand {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    return this.brands.splice(index, 1).at(0);
  }
}
