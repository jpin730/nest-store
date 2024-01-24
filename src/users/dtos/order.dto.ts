import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { UUID } from 'crypto'

export class CreateOrderDto {
  @ApiProperty()
  @IsUUID()
  readonly customerId: UUID
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
