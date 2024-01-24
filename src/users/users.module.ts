import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Customer } from './entities/customer.entity'
import { CustomersController } from './controllers/customers.controllers'
import { CustomersService } from './services/customers.service'
import { Order } from './entities/order.entity'
import { OrderItem } from './entities/order-item.entity'
import { OrderItemsController } from './controllers/order-items.controller'
import { OrderItemsService } from './services/order-items.service'
import { OrdersController } from './controllers/orders.controller'
import { OrdersService } from './services/orders.service'
import { ProductsModule } from '../products/products.module'
import { User } from './entities/user.entity'
import { UsersController } from './controllers/users.controllers'
import { UsersService } from './services/users.service'

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([Customer, User, Order, OrderItem]),
  ],
  controllers: [
    UsersController,
    CustomersController,
    OrdersController,
    OrderItemsController,
  ],
  providers: [UsersService, CustomersService, OrdersService, OrderItemsService],
})
export class UsersModule {}
