import { BaseErrors } from "../../helpers/errors";

export class OrderErrors extends BaseErrors {
  public static BAD_ORDER_USER = new Error("Bad Order User");
}
