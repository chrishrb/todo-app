import { BaseError } from "./base-error";

export class ConflictError extends BaseError {
    constructor(message: string = "Conflict.") {
      super(409, 'Conflict', message)
    }
}