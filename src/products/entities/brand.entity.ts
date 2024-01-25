import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { UUID } from 'crypto'

import { Product } from './product.entity'

@Entity()
export class Brand {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: UUID

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  name: string

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
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

  @ApiProperty({ type: () => Product, isArray: true })
  @OneToMany(() => Product, (product) => product.brand)
  products: Product[]
}
