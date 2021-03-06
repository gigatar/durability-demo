export class BaseErrors {
  public static NOT_IMPLEMENTED = new Error("Not Implemented");
  public static DUPLICATE_ID = new Error("Duplicate ID");
  public static BAD_STATUS = new Error("Bad Status");
}

export interface IAPIError {
  error: {
    statusCode: Number;
    extendedCode: Number;
    message: string;
  };
}

export const APIError = (
  statusCode: Number,
  extendedCode: Number,
  message: string
): IAPIError => {
  return {
    error: {
      statusCode,
      extendedCode,
      message,
    },
  };
};
