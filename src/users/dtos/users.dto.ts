import { ApiProperty, PartialType } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator'
import { UUID } from 'crypto'

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string

  @ApiProperty()
  @IsNotEmpty()
  readonly role: string

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  readonly customerId: UUID
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
