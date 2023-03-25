import { BaseError } from "./base-error";

export class ValidationError extends BaseError {
  constructor(message: string | object = "Validation error.") {
    super(400, 'ValidationError', message)
  }
}
