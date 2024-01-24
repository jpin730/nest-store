import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUrl } from 'class-validator'

import { PaginatedDto } from '../../common/dtos/query-params.dto'
import { Brand } from '../entities/brand.entity'

export class CreateBrandDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly image: string
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

export class PaginatedBrandsDto implements PaginatedDto<Brand> {
  @ApiProperty()
  data: Brand[]

  @ApiProperty()
  limit: number

  @ApiProperty()
  offset: number

  @ApiProperty()
  total: number
}
