import { InternalError } from "./errors/internal-error"
import { NotFoundError } from "./errors/not-found-error"
import { ValidationError } from "./errors/validation-error"
import { BadRequestError } from "./errors/bad-request-error";
import { ForbiddenError, UnauthorizedError } from "./errors/login-error";
import { ConflictError } from "./errors/conflict-error";
import { logger } from "../utils/logger";

export function errorHandlingMiddleware(err: any, req: any, res: any, next: any) {
  const middlewareErrors = [
    InternalError,
    NotFoundError,
    ValidationError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    ConflictError,
  ];

  logger.debug("Error Handling Middleware: ", err.constructor.name, err);

  if (middlewareErrors.some((middlewareError) => err instanceof middlewareError)) {
    res.status(err.errorCode).send(err.print())
    return;
  }

  const internalServerError = new InternalError(err);
  res.status(internalServerError.errorCode).send(internalServerError.print())
}
