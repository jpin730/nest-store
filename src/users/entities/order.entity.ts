import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { UUID } from 'crypto'

import { Customer } from './customer.entity'
import { OrderItem } from './order-item.entity'

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: UUID

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

  @ApiProperty({ type: () => Customer })
  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer

  @ApiProperty({ type: () => OrderItem })
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[]

  @Expose()
  @ApiProperty()
  get total(): number {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .reduce((total, item) => {
          const totalItem = item.product.price * item.quantity
          return total + totalItem
        }, 0)
    }
    return 0
  }
}
