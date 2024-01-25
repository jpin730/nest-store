import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { UUID } from 'crypto'

import { Product } from '../../products/entities/product.entity'
import { Order } from './order.entity'

@Entity()
export class OrderItem {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: UUID

  @ApiProperty()
  @Column({ type: 'int' })
  quantity: number

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

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @ApiProperty({ type: () => Order })
  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order: Order
}
