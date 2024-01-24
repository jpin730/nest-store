import { ApiProperty, PartialType } from '@nestjs/swagger'
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator'
import { UUID } from 'crypto'

import { PaginatedDto } from '../../common/dtos/query-params.dto'
import { Product } from '../entities/product.entity'

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly image: string

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly brandId: UUID

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoryIds: UUID[]
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class PaginatedProductsDto implements PaginatedDto<Product> {
  @ApiProperty()
  data: Product[]

  @ApiProperty()
  limit: number

  @ApiProperty()
  offset: number

  @ApiProperty()
  total: number
}
