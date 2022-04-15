import { HttpGet } from "../../helpers/httpClient";
import { IUser } from "../userDomain/userRepo";
import { OrderErrors } from "./orderErrors";
import { IOrder, IOrderRepo } from "./orderRepo";

export interface IOrderService {
  addOrder(order: IOrder): Promise<Number>;
}

export class OrderService implements IOrderService {
  private dao: IOrderRepo;
  constructor(dao: IOrderRepo) {
    this.dao = dao;
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
      const id = await HttpGet<IUser>(
        `http://localhost:3001/users/${userId}`,
        200
      );
      console.log(id);
    } catch (error) {
      throw error;
    }
  }
}
