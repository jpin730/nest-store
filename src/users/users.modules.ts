import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from './entities/customer.entity';
import { CustomersController } from './controllers/customers.controllers';
import { CustomersService } from './services/customers.service';
import { ProductsModule } from 'src/products/products.module';
import { User } from './entities/user.entity';
import { UsersController } from './controllers/users.controllers';
import { UsersService } from './services/users.service';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([Customer, User])],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
