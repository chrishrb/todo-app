import { ErrorSchema } from "../../schemas/error.schema";

/**
 * BaseError
 *
 * @typedef {object} BaseError
 * @property {number} errorCode - ErrorCode
 * @property {string} errorMessage - ErrorMessage
 * @property {ErrorSchema[]} details - Details
 */
export abstract class BaseError extends Error {
  public errorCode: number;
  public errorMessage: string;
  public details?: ErrorSchema[];

  constructor(errorCode: number, errorMessage: string, details?: ErrorSchema[]) {
    super();

    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.details = details;
  }

  print() {
    return {
      errorCode: this.errorCode,
      errorMessage: this.errorMessage,
      details: this.details,
    }
  }
}
