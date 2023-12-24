import { ApiProperty } from '@nestjs/swagger';

import { UUID } from 'crypto';

export class User {
  @ApiProperty()
  id: UUID;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: string;
}
