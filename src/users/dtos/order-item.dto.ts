import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsNotEmpty, IsPositive, IsUUID } from 'class-validator'
import { UUID } from 'crypto'

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
