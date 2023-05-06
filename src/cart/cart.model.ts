import {
    Column,
    CreatedAt,
    UpdatedAt,
    DataType,
    Model,
    HasMany,
    PrimaryKey,
    Unique,
    Table,
  } from 'sequelize-typescript';
  
  import { CartItem } from '../cartItem/cartItem.model';
  
  export enum ECartStatus {
    OPEN = 'OPEN',
    ORDERRED = 'ORDERED',
  }
  
  @Table({ tableName: 'carts', timestamps: true })
  export class Cart extends Model<Cart> {
    @PrimaryKey
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    id: string;
  
    @Unique
    @Column(DataType.UUIDV4)
    user_id: string;
  
    @CreatedAt
    @Column(DataType.DATE)
    created_at: string;
  
    @UpdatedAt
    @Column(DataType.DATE)
    updated_at: string;
  
    @Column({
      type: DataType.ENUM,
      values: Object.values(ECartStatus.OPEN),
      defaultValue: ECartStatus.OPEN,
    })
    status: string;
  
    @HasMany(() => CartItem, { onDelete: 'CASCADE', hooks: true })
    items: CartItem[];
  }