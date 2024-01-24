import { ApiProperty } from '@nestjs/swagger'
import { UUID } from 'crypto'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

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

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product)
  product: Product

  @ApiProperty({ type: () => Order })
  @ManyToOne(() => Order, (order) => order.items)
  order: Order
}
