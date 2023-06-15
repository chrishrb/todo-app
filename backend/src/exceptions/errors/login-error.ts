import { ErrorSchema } from "../../schemas/error.schema";
import { BaseError } from "./base-error";

export class UnauthorizedError extends BaseError {
  constructor(details: ErrorSchema[]) {
    super(401, 'Unauthorized', details)
  }
}

export class ForbiddenError extends BaseError {
  constructor(details: ErrorSchema[]) {
    super(403, 'Forbidden', details)
  }
}
