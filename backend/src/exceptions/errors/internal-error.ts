import { ErrorSchema } from "../../schemas/error.schema";
import { BaseError } from "./base-error";

export class InternalError extends BaseError {
  constructor(details?: ErrorSchema[]) {
    super(500, 'InternalServerError', details)
  }
}
