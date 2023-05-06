import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CartItemService } from '../cartItem/cartItem.service';
import { OrderService } from '../order/order.service';
import { ProductService } from '../product/product.service';

import { CartController } from './cart.controller';
import { CartService } from './cart.service';

import { Cart } from './cart.model';
import { CartItem } from '../cartItem/cartItem.model';
import { Order } from '../order/order.model';
import { Product } from '../product/product.model';
import { JWT_CONFIG } from '../constants';


@Module({
  imports: [
    SequelizeModule.forFeature([Cart, CartItem, Order, Product]),
    AuthModule,
    UsersModule,
    JwtModule.register({
      secret: JWT_CONFIG.secret,
      signOptions: { expiresIn: JWT_CONFIG.expiresIn },
    }),
  ],
  providers: [CartService, CartItemService, OrderService, ProductService],
  controllers: [CartController],
  exports: [SequelizeModule, CartService],
})
export class CartModule {}
