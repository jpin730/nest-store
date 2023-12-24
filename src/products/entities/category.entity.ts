import { ApiProperty } from '@nestjs/swagger';

import { UUID } from 'crypto';

export class Category {
  @ApiProperty()
  id: UUID;

  @ApiProperty()
  name: string;
}
