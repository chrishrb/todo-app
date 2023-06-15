import { ErrorSchema } from "../../schemas/error.schema";
import { BaseError } from "./base-error";

export class BadRequestError extends BaseError {
  constructor(details: ErrorSchema[]) {
    super(400, 'BadRequest', details)
  }
}
