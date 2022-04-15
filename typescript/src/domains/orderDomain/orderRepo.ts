export interface IOrder {
  id?: Number;
  userId: Number;
  createdDate?: Date;
}

const orders: IOrder[] = [];
let id = 0;

export interface IOrderRepo {
  createOrder(order: IOrder): Number;
}

export class OrderRepository implements IOrderRepo {
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
