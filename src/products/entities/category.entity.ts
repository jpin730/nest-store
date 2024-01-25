import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { UUID } from 'crypto'

import { Product } from './product.entity'

@Entity()
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: UUID

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  name: string

  @Exclude()
  @ApiHideProperty()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date

  @Exclude()
  @ApiHideProperty()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date

  @ApiProperty({ type: () => Product, isArray: true })
  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[]
}
