import { ApiProperty } from '@nestjs/swagger';

import { UUID } from 'crypto';

export class Customer {
  @ApiProperty()
  id: UUID;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;
}
