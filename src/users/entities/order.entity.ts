import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

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

  @ApiProperty({ type: () => Customer })
  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @ApiProperty({ type: () => OrderItem })
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];
}
