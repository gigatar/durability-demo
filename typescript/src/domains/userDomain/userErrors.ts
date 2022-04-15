import { BaseErrors } from "../../helpers/errors";

export class UserErrors extends BaseErrors {
  public static USER_NOT_FOUND = new Error("User Not Found");
  public static USER_EXISTS = new Error("User Exists");
  public static INVALID_FIRST_NAME = new Error("Invalid First Name");
  public static INVALID_LAST_NAME = new Error("Invalid Last Name");
}
