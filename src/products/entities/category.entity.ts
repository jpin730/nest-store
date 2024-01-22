import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

import { Product } from './product.entity';

@Entity()
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ApiProperty({ type: () => Product, isArray: true })
  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
