import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Product } from './product.model';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product)
        private productModel: typeof Product,
    ) { }

    async findById(id: string): Promise<Product> {
        const item = await this.productModel.findByPk(id);
        return item;
    }

    async getCartPrice(idList: { id: string; count: number }[]): Promise<number> {
        const products = await this.productModel.findAll({
            where: {
                id: idList.map(item => item.id),
            },
            attributes: ['id', 'price'],
        });
        const itemPrices = products
            .map(item => item.dataValues)
            .reduce((acc, item) => {
                acc[item.id] = item.price;
                return acc;
            }, {});

        const total = idList.reduce((acc, item) => {
            const itemPrice = itemPrices[item.id] || 0;
            const totalPrice = itemPrice * item.count;
            return (acc += totalPrice);
        }, 0);

        return total;
    }
}