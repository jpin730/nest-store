import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { UUID } from 'crypto'

import { Customer } from './customer.entity'

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: UUID

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  email: string

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  password: string

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  role: string

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

  @ApiProperty({ type: () => Customer })
  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer
}
