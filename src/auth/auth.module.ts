import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';

import { JWT_CONFIG } from '../constants';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { User } from '../users/users.model';

const { secret, expiresIn } = JWT_CONFIG;

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    UsersModule,
    JwtModule.register({
      secret: JWT_CONFIG.secret,
      signOptions: { expiresIn: JWT_CONFIG.expiresIn },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [SequelizeModule, SequelizeModule],
})
export class AuthModule {}
