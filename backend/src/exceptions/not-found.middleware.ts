import { NotFoundError } from "./errors/not-found-error";

export function notFoundMiddleware(req: any, res: any) {
  const notFoundError = new NotFoundError();
  res.status(notFoundError.errorCode).send(notFoundError.print())
}
