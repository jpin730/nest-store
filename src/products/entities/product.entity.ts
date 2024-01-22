import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty()
  @Column({ type: 'decimal' })
  price: number;

  @ApiProperty()
  @Column({ type: 'int' })
  stock: number;

  @ApiProperty()
  @Column({ type: 'varchar' })
  image: string;

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

  @ApiProperty({ type: () => Brand })
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @ApiProperty({ type: () => Category, isArray: true })
  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];
}
