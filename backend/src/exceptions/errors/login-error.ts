import { BaseError } from "./base-error";

export class UnauthorizedError extends BaseError {
  constructor(message: string = "Unauthorized.") {
    super(401, 'Unauthorized', message)
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string = "Forbidden.") {
    super(403, 'Forbidden', message)
  }
}
