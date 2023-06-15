import { ErrorSchema } from "../../schemas/error.schema";
import { BaseError } from "./base-error";

export class ValidationError extends BaseError {
  constructor(details: ErrorSchema[]) {
    super(400, 'ValidationError', details)
  }
}
