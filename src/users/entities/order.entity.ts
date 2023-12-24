import { ApiProperty } from '@nestjs/swagger';

import { Product } from './../../products/entities/product.entity';
import { User } from './user.entity';

export class Order {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  user: User;

  @ApiProperty()
  products: Product[];
}
