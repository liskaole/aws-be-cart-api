import {
    Column,
    DataType,
    Model,
    PrimaryKey,
    Unique,
    Table,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User> {
    @PrimaryKey
    @Column({ type: DataType.UUID, defaultValue: uuidv4() })
    id: string;

    @Unique
    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    password: string;

    @Column(DataType.STRING)
    email?: string;
}