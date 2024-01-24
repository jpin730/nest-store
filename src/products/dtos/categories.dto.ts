import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

import { PaginatedDto } from '../../common/dtos/query-params.dto'
import { Category } from '../entities/category.entity'

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class PaginatedCategoriesDto implements PaginatedDto<Category> {
  @ApiProperty()
  data: Category[]

  @ApiProperty()
  limit: number

  @ApiProperty()
  offset: number

  @ApiProperty()
  total: number
}
