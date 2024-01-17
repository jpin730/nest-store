import { Injectable, NotFoundException } from '@nestjs/common';

import { UUID } from 'crypto';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dtos';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    {
      id: crypto.randomUUID(),
      name: 'Category 1',
    },
  ];

  findAll(): Category[] {
    return this.categories;
  }

  findOne(id: UUID): Category {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto): Category {
    const category = {
      id: crypto.randomUUID(),
      ...payload,
    };
    this.categories.push(category);
    return category;
  }

  update(id: UUID, payload: UpdateCategoryDto): Category {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    this.categories[index] = {
      ...this.categories[index],
      ...payload,
    };
    return this.categories[index];
  }

  remove(id: UUID): Category {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return this.categories.splice(index, 1).at(0);
  }
}
