import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

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
