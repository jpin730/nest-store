import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dtos';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepo.find();
  }

  async findOne(id: UUID): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: { products: true },
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepo.create(payload);
    return this.categoryRepo.save(category);
  }

  async update(id: UUID, payload: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    this.categoryRepo.merge(category, payload);
    return this.categoryRepo.save(category);
  }

  async remove(id: UUID): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return this.categoryRepo.remove(category);
  }
}
