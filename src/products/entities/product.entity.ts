import { ApiProperty } from '@nestjs/swagger';

import { UUID } from 'crypto';

export class Product {
  @ApiProperty()
  id: UUID;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  image: string;
}
