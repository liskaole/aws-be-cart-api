import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';

import { CartItem } from './cartItem.model';

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(CartItem)
    private cartItemModel: typeof CartItem,
  ) {}

  async findByCartId(cartId: string): Promise<CartItem[] | undefined> {
    const cartItems = await this.cartItemModel.findAll({
      where: {
        cart_id: cartId,
      },
      attributes: ['id', 'user_id'],
    });
    return cartItems;
  }

  async createByCartId(
    cartId: string,
    itemData: Partial<CartItem>,
  ): Promise<CartItem> {
    const savedCartItem = await this.cartItemModel.create({
      ...itemData,
      cart_id: cartId,
    });
    return savedCartItem;
  }

  async fillItemsByCardId(
    cartId: string,
    newItems: CartItem[],
  ): Promise<CartItem[]> {
    await this.cartItemModel.destroy({
      where: { cart_id: cartId },
    });
    return await this.addItemsByCardId(cartId, newItems);
  }

  async addItemsByCardId(
    cartId: string,
    newItems: CartItem[],
  ): Promise<CartItem[]> {
    const recentItems = await this.cartItemModel.bulkCreate(
      newItems.map(item => ({ ...item, id: uuidv4(), cart_id: cartId }), {
        returning: ['id', 'count'],
      }),
    );
    return recentItems;
  }

  async getByCardId(cartId: string): Promise<CartItem[]> {
    return await this.cartItemModel.findAll({
      where: { cart_id: cartId },
    });
  }

  async removeByCardId(cartId: string) {
    const cartItems = await this.cartItemModel.findAll({
      where: { cart_id: cartId },
    });
    return await Promise.all(cartItems.map(item => item.destroy()));
  }
}