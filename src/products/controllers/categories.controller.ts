import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UUID } from 'crypto'

import {
  CreateCategoryDto,
  PaginatedCategoriesDto,
  UpdateCategoryDto,
} from '../dtos/categories.dto'
import { CategoriesService } from '../services/categories.service'
import { Category } from '../entities/category.entity'
import {
  ApiQueryFilters,
  QueryParamsDto,
} from '../../common/dtos/query-params.dto'

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ type: PaginatedCategoriesDto, status: 200 })
  @ApiQueryFilters()
  getAll(
    @Query() queryParams: QueryParamsDto,
  ): Promise<PaginatedCategoriesDto> {
    return this.categoriesService.findAll(queryParams)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category' })
  @ApiResponse({ type: Category, status: 200 })
  get(@Param('id', ParseUUIDPipe) id: UUID): Promise<Category> {
    return this.categoriesService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create a category' })
  @ApiResponse({ type: Category, status: 201 })
  @ApiBody({ type: CreateCategoryDto })
  create(@Body() payload: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(payload)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({ type: Category, status: 200 })
  @ApiBody({ type: UpdateCategoryDto })
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, payload)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ type: Category, status: 200 })
  delete(@Param('id', ParseUUIDPipe) id: UUID): Promise<Category> {
    return this.categoriesService.remove(id)
  }
}
