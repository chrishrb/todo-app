import { ErrorSchema } from "../../schemas/error.schema";
import { BaseError } from "./base-error";

export class NotFoundError extends BaseError {
  constructor(details: ErrorSchema[]) {
    super(404, 'NotFound', details)
  }
}
