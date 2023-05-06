import {
    Column,
    DataType,
    Model,
    ForeignKey,
    PrimaryKey,
    Unique,
    Table,
  } from 'sequelize-typescript';
  import { v4 as uuidv4 } from 'uuid';
  
  import { Cart } from '../cart/cart.model';
  import { Product } from '../product/product.model';
  
  @Table({ tableName: 'cart_items', timestamps: false })
  export class CartItem extends Model<CartItem> {
    @PrimaryKey
    @Column({ type: DataType.UUID, defaultValue: uuidv4() })
    id: string;
  
    @ForeignKey(() => Cart)
    @Unique
    @Column
    cart_id: string;
  
    @ForeignKey(() => Product)
    @Column
    product_id: string;
  
    @Column(DataType.NUMBER)
    count: number;
  }