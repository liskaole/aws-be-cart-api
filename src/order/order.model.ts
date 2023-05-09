import {
    Column,
    DataType,
    Model,
    ForeignKey,
    PrimaryKey,
    Table,
  } from 'sequelize-typescript';
  
  import { Cart } from '../cart/cart.model';
  import { User } from '../users/users.model';
  
  export enum EOrderStatus {
    CREATED = 'CREATED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
  }
  
  @Table({ tableName: 'orders', timestamps: false })
  export class Order extends Model<Order> {
    @PrimaryKey
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    id: string;
  
    @ForeignKey(() => User)
    @Column
    user_id: string;
  
    @ForeignKey(() => Cart)
    @Column
    cart_id: string;
  
    @Column(DataType.TEXT)
    payment: string;
  
    @Column(DataType.TEXT)
    delivery: string;
  
    @Column(DataType.TEXT)
    comments: string;
  
    @Column({
      type: DataType.ENUM,
      values: Object.values(EOrderStatus),
      defaultValue: EOrderStatus.CREATED,
    })
    status: string;
  
    @Column(DataType.NUMBER)
    total: number;
  }