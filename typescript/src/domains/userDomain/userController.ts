import { Router, Request, Response } from "express";

import { APIError } from "../../helpers/errors";
import { UserErrors } from "./userErrors";

import { IUser, UserRepository } from "./userRepo";
import { UserService } from "./userService";

export const userRouter = Router();

const service = new UserService(new UserRepository());

userRouter.post("/", (req: Request, res: Response) => {
  try {
    const body: IUser = req.body ?? {};
    const userId = service.addUser(body);

    res.status(201).json({ userId });
  } catch (error) {
    switch (error) {
      case UserErrors.INVALID_FIRST_NAME:
        res
          .status(400)
          .send(APIError(400, 1, UserErrors.INVALID_FIRST_NAME.message));
        break;
      case UserErrors.INVALID_LAST_NAME:
        res
          .status(400)
          .send(APIError(400, 2, UserErrors.INVALID_LAST_NAME.message));
        break;
      case UserErrors.USER_EXISTS:
        res.status(409).send(APIError(409, 1, UserErrors.USER_EXISTS.message));
        break;
      case UserErrors.DUPLICATE_ID:
        res.status(500).send(APIError(500, 1, UserErrors.DUPLICATE_ID.message));
        break;
      default:
        console.log(error);
        res.status(500).send(APIError(500, 1, "Internal Error"));
    }
  }
});

userRouter.get("/", (req: Request, res: Response) => {
  try {
    const users = service.getAllUsers();

    res.status(200).send({ users });
  } catch (error) {
    switch (error) {
      case UserErrors.USER_NOT_FOUND:
        res.status(204).send();
        break;
      default:
        console.log(error);
        res.status(500).send(APIError(500, 1, "Internal Error"));
    }
  }
});
userRouter.get("/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10) ?? -1;
    if (id < 1) {
      throw "Invalid ID";
    }

    const user = service.getUserById(id);

    res.json(user);
  } catch (error) {
    switch (error) {
      case UserErrors.USER_NOT_FOUND:
        res
          .status(404)
          .send(APIError(404, 1, UserErrors.USER_NOT_FOUND.message));
        break;
      case UserErrors.NOT_IMPLEMENTED:
        res
          .status(501)
          .send(APIError(501, 1, UserErrors.NOT_IMPLEMENTED.message));
        break;
      default:
        console.log(error);
        res.status(500).send(APIError(500, 1, "Internal Error"));
    }
  }
});
