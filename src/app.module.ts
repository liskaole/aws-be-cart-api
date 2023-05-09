import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { ProductModule } from './product/product.module';
import { CartItemModule } from './cartItem/cartItem.module';
import { UsersModule } from './users/users.module';

dotenv.config();

const DB_CONNECTION = {
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      ...DB_CONNECTION,
      autoLoadModels: true,
      synchronize: true,
      repositoryMode: true,
    }),
    AuthModule,
    UsersModule,
    CartModule,
    CartItemModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
