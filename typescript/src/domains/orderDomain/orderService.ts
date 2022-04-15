import { HttpGet } from "../../helpers/httpClient";
import { IUser } from "../userDomain/userRepo";
import { OrderErrors } from "./orderErrors";
import { IOrder, IOrderRepo } from "./orderRepo";

export interface IOrderService {
  addOrder(order: IOrder): Promise<Number>;
  getOrders(): IOrder[];
}

export class OrderService implements IOrderService {
  private dao: IOrderRepo;
  constructor(dao: IOrderRepo) {
    this.dao = dao;
  }
  getOrders(): IOrder[] {
    try {
      return this.dao.getOrders();
    } catch (error) {
      throw error;
    }
  }
  async addOrder(order: IOrder): Promise<Number> {
    try {
      await this.validateUserId(order.userId);
      return this.dao.createOrder(order);
    } catch (error) {
      if (error === OrderErrors.BAD_STATUS) {
        throw OrderErrors.BAD_ORDER_USER;
      }

      throw error;
    }
  }

  private async validateUserId(userId: Number): Promise<void> {
    try {
      await HttpGet<void>(`http://localhost:3001/users/${userId}`, 200);
    } catch (error) {
      throw error;
    }
  }
}
