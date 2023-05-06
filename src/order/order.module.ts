import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CartModule } from '../cart/cart.module';

import { CartService } from '../cart/cart.service';
import { OrderService } from './order.service';
import { UserService } from '../users/users.service';

import { Cart } from '../cart/cart.model';
import { User } from '../users/users.model';
import { Order } from './order.model';

import { JWT_CONFIG } from '../constants';

@Module({
  imports: [
    SequelizeModule.forFeature([Cart, Order, User]),
    AuthModule,
    CartModule,
    UsersModule,
    JwtModule.register({
      secret: JWT_CONFIG.secret,
      signOptions: { expiresIn: JWT_CONFIG.expiresIn },
    }),
  ],
  providers: [CartService, OrderService, UserService],
  exports: [SequelizeModule, OrderService],
})
export class OrderModule {}
