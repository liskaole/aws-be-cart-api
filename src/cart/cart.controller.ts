import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';

import { AppRequest, getUserIdFromRequest } from '../shared';
import { AuthGuard } from '../auth/guards';

import { CartService } from './cart.service';
import { CartItemService } from '../cartItem/cartItem.service';
import { OrderService } from '../order/order.service';
import { ProductService } from '../product/product.service';

import { ECartStatus } from './cart.model';
import { createDTO } from '../order/create.dto';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private cartItemService: CartItemService,
    private orderService: OrderService,
    private productService: ProductService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const userId = getUserIdFromRequest(req);
    const { dataValues } = await this.cartService.findOrCreateByUserId(userId);
    const items = await this.cartItemService.getByCardId(dataValues.id);
    const total = await this.productService.getCartPrice(
      items.map(({ product_id, count }) => ({ id: product_id, count })),
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart: { ...dataValues, items }, total },
    };
  }

  @UseGuards(AuthGuard)
  @Post()
  async fillUserCart(@Req() req: AppRequest, @Body() body) {
    const userId = getUserIdFromRequest(req);
    try {
      const { id } = await this.cartService.findOrCreateByUserId(userId);
      await this.cartItemService.removeByCardId(id);
      const items = await this.cartItemService.addItemsByCardId(id, body);
      const { dataValues } = await this.cartService.updateItems(id, body);
      const total = await this.productService.getCartPrice(
        items.map(({ product_id, count }) => ({ id: product_id, count })),
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: {
          cart: { ...dataValues, items },
          total,
        },
      };
    } catch (e) {
      return {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: "Request is unprocessable. Check products' IDs",
        body,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) {
    const userId = getUserIdFromRequest(req);
    try {
      const { id } = await this.cartService.findOrCreateByUserId(userId);
      const allItems = await this.cartItemService.addItemsByCardId(id, body);
      const { dataValues } = await this.cartService.updateItems(id, body);
      const total = await this.productService.getCartPrice(
        allItems.map(({ product_id, count }) => ({ id: product_id, count })),
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: {
          cart: { ...dataValues, items: [...allItems] },
          total,
        },
      };
    } catch (e) {
      return {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Request is unprocessable',
        body,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Delete()
  async clearUserCart(@Req() req: AppRequest) {
    const userId = getUserIdFromRequest(req);
    try {
      await this.cartService.removeByUserId(userId);

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
      };
    } catch (e) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: 'Cannot delete cart which is already ORDERED',
      };
    }
  }

  @UseGuards(AuthGuard)
  @Post('checkout')
  async checkout(@Req() req: AppRequest, @Body() body) {
    const { paymentData = '', deliveryData = '', comments = '' } = req.body;
    const userId = getUserIdFromRequest(req);
    const cart = await this.cartService.findByUserId(userId);
    let items;
    if (cart && cart.id && cart.status === 'OPEN') {
      items = await this.cartItemService.getByCardId(cart.id);
    } else {
      const statusCode = HttpStatus.BAD_REQUEST;
      req.statusCode = statusCode;

      return {
        statusCode,
        message: 'No active cart for this user found',
      };
    }

    if (!(cart && items.length)) {
      const statusCode = HttpStatus.BAD_REQUEST;
      req.statusCode = statusCode;

      return {
        statusCode,
        message: 'Cart is empty',
      };
    }

    const total = await this.productService.getCartPrice(
      items.map(({ product_id, count }) => ({ id: product_id, count })),
    );

    const orderData: createDTO = {
      userId,
      cartId: cart.id,
      paymentData,
      deliveryData,
      comments,
      total,
    };

    const order = await this.orderService.create(orderData);
    if (order) {
      await this.cartService.changeStatusById(cart.id, ECartStatus.ORDERRED);

      const statusCode = HttpStatus.OK;
      req.statusCode = statusCode;
      return {
        statusCode,
        message: 'Thank you for your order',
        data: { order },
      };
    }
  }
}