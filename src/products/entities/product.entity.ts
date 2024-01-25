import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { UUID } from 'crypto'

import { Brand } from './brand.entity'
import { Category } from './category.entity'

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: UUID

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  name: string

  @ApiProperty()
  @Column({ type: 'text' })
  description: string

  @ApiProperty()
  @Column({ type: 'decimal' })
  price: number

  @ApiProperty()
  @Column({ type: 'int' })
  stock: number

  @ApiProperty()
  @Column({ type: 'varchar' })
  image: string

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

  @ApiProperty({ type: () => Brand })
  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand

  @ApiProperty({ type: () => Category, isArray: true })
  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'product_categories',
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  categories: Category[]
}
