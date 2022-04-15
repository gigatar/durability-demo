import { Request, Response, Router } from "express";
import { APIError } from "../../helpers/errors";
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
