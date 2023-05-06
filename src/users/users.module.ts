import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './users.model';
import { UserService } from './users.service';

@Module({
  imports: [SequelizeModule.forFeature([User]), UsersModule],
  providers: [UserService],
  exports: [SequelizeModule, UserService],
})
export class UsersModule {}