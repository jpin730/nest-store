import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { UUID } from 'crypto'

import { PaginatedDto } from '../../common/dtos/query-params.dto'
import { Order } from '../entities/order.entity'

export class CreateOrderDto {
  @ApiProperty()
  @IsUUID()
  readonly customerId: UUID
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class PaginatedOrdersDto implements PaginatedDto<Order> {
  @ApiProperty()
  data: Order[]

  @ApiProperty()
  limit: number

  @ApiProperty()
  offset: number

  @ApiProperty()
  total: number
}
