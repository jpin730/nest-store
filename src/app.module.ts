import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DatabaseModule } from './database/database.modules'
import { ProductsModule } from './products/products.module'
import { UsersModule } from './users/users.module'
import { environments } from './environments'
import config from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] ?? '.env',
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    ProductsModule,
    UsersModule,
  ],
})
export class AppModule {}
