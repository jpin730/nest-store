import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { UUID } from 'crypto'

import { User } from './user.entity'
import { Order } from './order.entity'

@Entity()
export class Customer {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: UUID

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  name: string

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  phone: string

  @ApiProperty()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date

  @ApiProperty()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date

  @ApiProperty({ type: () => User })
  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User

  @ApiProperty({ type: () => Order, isArray: true })
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[]
}
