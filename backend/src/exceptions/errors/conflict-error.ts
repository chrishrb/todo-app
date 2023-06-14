import { ErrorSchema } from "../../schemas/error.schema";
import { BaseError } from "./base-error";

export class ConflictError extends BaseError {
  constructor(details: ErrorSchema[]) {
    super(409, 'Conflict', details)
  }
}
