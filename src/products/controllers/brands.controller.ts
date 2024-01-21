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

import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';
import { Brand } from '../entities/brand.entity';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  getAll(): Promise<Brand[]> {
    return this.brandsService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: UUID): Promise<Brand> {
    return this.brandsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateBrandDto): Promise<Brand> {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateBrandDto,
  ): Promise<Brand> {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: UUID): Promise<Brand> {
    return this.brandsService.remove(id);
  }
}
