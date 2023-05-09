import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

import { Product } from './product.model';
import { ProductService } from './product.service';

import { JWT_CONFIG } from '../constants';

@Module({
    imports: [
        SequelizeModule.forFeature([Product]),
        AuthModule,
        UsersModule,
        JwtModule.register({
            secret: JWT_CONFIG.secret,
            signOptions: { expiresIn: JWT_CONFIG.expiresIn },
        }),
    ],
    providers: [ProductService],
    exports: [SequelizeModule, ProductService],
})
export class ProductModule { }