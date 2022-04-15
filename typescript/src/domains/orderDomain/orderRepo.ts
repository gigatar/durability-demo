import { OrderErrors } from "./orderErrors";

export interface IOrder {
  id?: Number;
  userId: Number;
  userName?: string;
  createdDate?: Date;
}

const orders: IOrder[] = [];
let id = 0;

export interface IOrderRepo {
  createOrder(order: IOrder): Number;
  getOrders(): IOrder[];
}

export class OrderRepository implements IOrderRepo {
  getOrders(): IOrder[] {
    try {
      if (orders.length === 0) {
        throw OrderErrors.ORDER_NOT_FOUND;
      }

      return orders;
    } catch (error) {
      throw error;
    }
  }
  createOrder(order: IOrder): Number {
    try {
      const newOrder: IOrder = {
        id: ++id,
        userId: order.userId,
        createdDate: order.createdDate ?? new Date(),
      };

      orders.push(newOrder);
      return id;
    } catch (error) {
      throw error;
    }
  }
}
