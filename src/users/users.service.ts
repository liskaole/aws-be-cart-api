import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    findByName(name: string): Promise<User> {
        return this.userModel.findOne({
            where: {
                name,
            },
        });
    }
}