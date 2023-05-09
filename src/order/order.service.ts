import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';

import { Order } from './order.model';
import { createDTO } from './create.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
  ) {}

  async create({
    userId,
    cartId,
    paymentData = '',
    deliveryData = '',
    comments = '',
    total,
  }: createDTO): Promise<Order> {
    const orderItem = await this.orderModel.create({
      id: uuidv4(),
      user_id: userId,
      cart_id: cartId,
      payment: paymentData,
      delivery: deliveryData,
      comments,
      total,
    });
    return orderItem;
  }
}