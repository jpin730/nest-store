import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controllers';
import { UsersService } from './services/users.service';
import { CustomersController } from './controllers/customers.controllers';
import { CustomersService } from './services/customers.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
