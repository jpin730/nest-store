import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UUID } from 'crypto'

import { BrandsService } from '../services/brands.service'
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto'
import { Brand } from '../entities/brand.entity'

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all brands' })
  @ApiResponse({
    type: Brand,
    isArray: true,
    status: 200,
  })
  getAll(): Promise<Brand[]> {
    return this.brandsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a brand' })
  @ApiResponse({ type: Brand, status: 200 })
  get(@Param('id', ParseUUIDPipe) id: UUID): Promise<Brand> {
    return this.brandsService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create a brand' })
  @ApiResponse({ type: Brand, status: 201 })
  @ApiBody({ type: CreateBrandDto })
  create(@Body() payload: CreateBrandDto): Promise<Brand> {
    return this.brandsService.create(payload)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a brand' })
  @ApiResponse({ type: Brand, status: 200 })
  @ApiBody({ type: UpdateBrandDto })
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() payload: UpdateBrandDto,
  ): Promise<Brand> {
    return this.brandsService.update(id, payload)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a brand' })
  @ApiResponse({ type: Brand, status: 200 })
  delete(@Param('id', ParseUUIDPipe) id: UUID): Promise<Brand> {
    return this.brandsService.remove(id)
  }
}
