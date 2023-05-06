import {
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table({ tableName: 'products', timestamps: false })
export class Product extends Model<Product> {
    @PrimaryKey
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    id: string;

    @Column
    title: string;

    @Column
    description: string;

    @Column(DataType.NUMBER)
    price: number;
}