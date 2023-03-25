import { BaseError } from "./base-error";

export class InternalError extends BaseError {
  constructor(message: string = "Internal Server Error.") {
    super(500, 'InternalServerError', message)
  }
}
