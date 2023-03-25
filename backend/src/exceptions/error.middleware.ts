import { InternalError } from "./errors/internal-error"
import { NotFoundError } from "./errors/not-found-error"
import { ValidationError } from "./errors/validation-error"
import { BadRequestError } from "./errors/bad-request-error";
import { Prisma } from "@prisma/client";

export function errorHandlingMiddleware(err: any, req: any, res: any, next: any) {
  const middlewareErrors = [
    InternalError,
    NotFoundError,
    ValidationError,
    BadRequestError,
  ];

  console.log("Error Handling Middleware: ", err.constructor.name);

  if (middlewareErrors.some((middlewareError) => err instanceof middlewareError)) {
    res.status(err.errorCode).send(err.print())
    return;
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    const validationError = new ValidationError(err);
    res.status(validationError.errorCode).send(validationError.print())
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const badRequestError = new BadRequestError(err);
    res.status(badRequestError.errorCode).send(badRequestError.print())
    return;
  }

  const internalServerError = new InternalError(err);
  res.status(internalServerError.errorCode).send(internalServerError.print())
}
