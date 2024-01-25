import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNotEmpty, IsPositive, IsUUID } from 'class-validator'
import { UUID } from 'crypto'

import { PaginatedDto } from '../../common/dtos/query-params.dto'
import { OrderItem } from '../entities/order-item.entity'

export class CreateOrderItemDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly orderId: UUID

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly productId: UUID

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  readonly quantity: number
}

export class UpdateOrderItemDto extends PickType(CreateOrderItemDto, [
  'quantity',
]) {}

export class PaginatedOrderItemsDto implements PaginatedDto<OrderItem> {
  @ApiProperty()
  data: OrderItem[]

  @ApiProperty()
  limit: number

  @ApiProperty()
  offset: number

  @ApiProperty()
  total: number
}
