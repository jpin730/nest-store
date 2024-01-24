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

import { User } from '../entities/user.entity'
import { PaginatedDto } from '../../common/dtos/query-params.dto'

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

export class PaginatedUsersDto implements PaginatedDto<User> {
  @ApiProperty()
  data: User[]

  @ApiProperty()
  limit: number

  @ApiProperty()
  offset: number

  @ApiProperty()
  total: number
}
