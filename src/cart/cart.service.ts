import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CartItem } from '../cartItem/cartItem.model';

import { Cart, ECartStatus } from './cart.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private cartModel: typeof Cart,
  ) {}

  async findByUserId(userId: string): Promise<Cart | undefined> {
    const cart = await this.cartModel.findOne({
      where: {
        user_id: userId,
        status: ECartStatus.OPEN,
      },
    });
    return cart;
  }

  async createByUserId(userId: string): Promise<Cart> {
    const newCart: Partial<Cart> = { user_id: userId };
    const savedCart = await this.cartModel.create(newCart);
    return savedCart;
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const existingUserCart = await this.findByUserId(userId);

    if (existingUserCart) {
      return existingUserCart;
    }

    const newCart = await this.createByUserId(userId);
    return newCart;
  }

  async updateItems(cartId: string, items: CartItem[]): Promise<Cart> {
    const cart = await this.cartModel.findByPk(cartId);
    cart.set({ items });

    return cart;
  }

  async removeByUserId(userId): Promise<any> {
    const cart = await this.findByUserId(userId);
    if (cart.status !== 'OPEN') {
      return Promise.reject();
    }
    if (!cart) {
      return Promise.resolve();
    }
    return await cart.destroy({ force: true });
  }

  async changeStatusById(cartId, status = ECartStatus.ORDERRED): Promise<any> {
    const cart = await this.cartModel.findByPk(cartId);

    if (!cart) {
      return Promise.resolve();
    }
    return await cart.set({ status }).save();
  }
}