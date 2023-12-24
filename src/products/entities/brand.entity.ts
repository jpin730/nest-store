import { ApiProperty } from '@nestjs/swagger';

import { UUID } from 'crypto';

export class Brand {
  @ApiProperty()
  id: UUID;

  @ApiProperty()
  name: string;

  @ApiProperty()
  image: string;
}
