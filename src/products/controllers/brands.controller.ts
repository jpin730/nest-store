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

import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';
import { Brand } from '../entities/brand.entity';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  @ApiResponse({
    type: Brand,
    isArray: true,
    status: 200,
  })
  getAll(): Promise<Brand[]> {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: Brand, status: 200 })
  get(@Param('id', ParseUUIDPipe) id: UUID): Promise<Brand> {
    return this.brandsService.findOne(id);
  }

  @Post()
  @ApiResponse({ type: Brand, status: 201 })
  @ApiBody({ type: CreateBrandDto })
  create(@Body() payload: CreateBrandDto): Promise<Brand> {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  @ApiResponse({ type: Brand, status: 200 })
  @ApiBody({ type: UpdateBrandDto })
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateBrandDto,
  ): Promise<Brand> {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  @ApiResponse({ type: Brand, status: 200 })
  delete(@Param('id', ParseUUIDPipe) id: UUID): Promise<Brand> {
    return this.brandsService.remove(id);
  }
}
