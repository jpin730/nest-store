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
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';
import {
  ApiQueryFilters,
  PaginatedDto,
  QueryParamsDto,
} from 'src/common/dtos/query-params.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ type: Product, isArray: true, status: 200 })
  @ApiQueryFilters()
  getAll(@Query() queryParams: QueryParamsDto): Promise<PaginatedDto<Product>> {
    return this.productsService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product' })
  @ApiResponse({ type: Product, status: 200 })
  get(@Param('id', ParseUUIDPipe) id: UUID): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({ type: Product, status: 201 })
  @ApiBody({ type: CreateProductDto })
  create(@Body() payload: CreateProductDto): Promise<Product> {
    return this.productsService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ type: Product, status: 200 })
  @ApiBody({ type: UpdateProductDto })
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ type: Product, status: 200 })
  delete(@Param('id', ParseUUIDPipe) id: UUID): Promise<Product> {
    return this.productsService.remove(id);
  }

  @Put(':id/category/:categoryId')
  @ApiOperation({ summary: 'Add a category to a product' })
  @ApiResponse({ type: Product, status: 200 })
  addCategory(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Param('categoryId', ParseUUIDPipe) categoryId: UUID,
  ): Promise<Product> {
    return this.productsService.addCategoryByProduct(id, categoryId);
  }

  @Delete(':id/category/:categoryId')
  @ApiOperation({ summary: 'Remove a category from a product' })
  @ApiResponse({ type: Product, status: 200 })
  removeCategory(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Param('categoryId', ParseUUIDPipe) categoryId: UUID,
  ): Promise<Product> {
    return this.productsService.removeCategoryByProduct(id, categoryId);
  }
}
