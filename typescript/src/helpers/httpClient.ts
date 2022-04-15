import fetch from "node-fetch";
import { BaseErrors } from "./errors";

export const HttpGet = async <T>(url: string, status: Number): Promise<T> => {
  try {
    const body = await fetch(url);
    if (body.status !== status) {
      throw BaseErrors.BAD_STATUS;
    }
    return (await body.json()) as T;
  } catch (error) {
    throw error;
  }
};
