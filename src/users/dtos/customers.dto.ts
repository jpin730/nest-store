import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

import { PaginatedDto } from '../../common/dtos/query-params.dto'
import { Customer } from '../entities/customer.entity'

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly phone: string
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

export class PaginatedCustomersDto implements PaginatedDto<Customer> {
  @ApiProperty()
  data: Customer[]

  @ApiProperty()
  limit: number

  @ApiProperty()
  offset: number

  @ApiProperty()
  total: number
}
