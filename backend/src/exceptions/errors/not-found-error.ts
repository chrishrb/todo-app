import { BaseError } from "./base-error";

export class NotFoundError extends BaseError {
  constructor(message: string = "Page not found.") {
    super(404, 'NotFound', message)
  }
}
