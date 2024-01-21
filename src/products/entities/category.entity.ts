import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

@Entity()
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  name: string;
}
