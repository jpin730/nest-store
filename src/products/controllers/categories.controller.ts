import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UUID } from 'crypto';

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dtos';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../entities/category.entity';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAll(): Category[] {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: UUID): Category {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto): Category {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateCategoryDto,
  ): Category {
    return this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: UUID): Category {
    return this.categoriesService.remove(id);
  }
}
