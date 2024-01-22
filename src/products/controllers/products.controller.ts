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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

import { ProductsService } from '../services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dtos';
import { Product } from '../entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({ type: Product, isArray: true, status: 200 })
  getAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: Product, status: 200 })
  get(@Param('id', ParseUUIDPipe) id: UUID): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiResponse({ type: Product, status: 201 })
  @ApiBody({ type: CreateProductDto })
  create(@Body() payload: CreateProductDto): Promise<Product> {
    return this.productsService.create(payload);
  }

  @Put(':id')
  @ApiResponse({ type: Product, status: 200 })
  @ApiBody({ type: UpdateProductDto })
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  @ApiResponse({ type: Product, status: 200 })
  delete(@Param('id', ParseUUIDPipe) id: UUID): Promise<Product> {
    return this.productsService.remove(id);
  }
}
