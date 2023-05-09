import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CartModule } from '../cart/cart.module';
import { ProductModule } from '../product/product.module';
import { Product } from '../product/product.model';

import { CartItem } from './cartItem.model';

import { CartItemService } from './cartItem.service';

import { JWT_CONFIG } from '../constants';

@Module({
  imports: [
    SequelizeModule.forFeature([CartItem, Product]),
    AuthModule,
    CartModule,
    ProductModule,
    UsersModule,
    JwtModule.register({
      secret: JWT_CONFIG.secret,
      signOptions: { expiresIn: JWT_CONFIG.expiresIn },
    }),
  ],
  providers: [CartItemService],
  exports: [SequelizeModule, CartItemService],
})
export class CartItemModule {}