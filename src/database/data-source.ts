import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { config } from 'dotenv'

config()
const configService = new ConfigService()

export default new DataSource({
  type: 'postgres',
  username: configService.get('PG_USER'),
  password: configService.get('PG_PASSWORD'),
  database: configService.get('PG_DATABASE'),
  port: configService.get('PG_PORT'),
  host: configService.get('PG_HOST'),
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
})
