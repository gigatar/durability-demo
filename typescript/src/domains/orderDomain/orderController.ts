import { Request, Response, Router } from "express";
import { Interface } from "readline";
import { APIError } from "../../helpers/errors";
import { HttpGet } from "../../helpers/httpClient";
import { IUser } from "../userDomain/userRepo";
import { OrderErrors } from "./orderErrors";
import { IOrder, OrderRepository } from "./orderRepo";
import { OrderService } from "./orderService";

export const orderRouter = Router();

const service = new OrderService(new OrderRepository());

orderRouter.post("/", async (req: Request, res: Response) => {
  try {
    const order: IOrder = req.body ?? {};

    const orderId = await service.addOrder(order);
    res.status(201).json({ orderId });
  } catch (error) {
    switch (error) {
      case OrderErrors.BAD_ORDER_USER:
        res
          .status(400)
          .send(APIError(400, 1, OrderErrors.BAD_ORDER_USER.message));
        break;
      default:
        console.error(error);
        res.status(500).send(APIError(500, 1, "Internal Error"));
    }
  }
});

orderRouter.get("/", async (req: Request, res: Response) => {
  try {
    const orders = service.getOrders();
    const users = (
      await HttpGet<{ users: IUser[] }>("http://localhost:3001/users", 200)
    ).users;

    orders.map((o) => {
      const user = users.find((u) => u.id === o.userId);
      if (!user) {
        console.log(user);
        throw OrderErrors.BAD_ORDER_USER;
      }
      o.userName = `${user?.firstName} ${user?.lastName}`;
    });

    res.status(200).json({ orders });
  } catch (error) {
    switch (error) {
      case OrderErrors.ORDER_NOT_FOUND:
        res.status(204).send();
        break;
      case OrderErrors.BAD_ORDER_USER:
        res
          .status(400)
          .send(APIError(400, 1, OrderErrors.BAD_ORDER_USER.message));
        break;
      default:
        console.error(error);
        res.status(500).send(APIError(500, 1, "Internal Error"));
    }
  }
});
