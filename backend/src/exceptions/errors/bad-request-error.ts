import { BaseError } from "./base-error";

export class BadRequestError extends BaseError {
  constructor(message: string | object = "Bad Request.") {
    super(400, 'BadRequest', message)
  }
}
