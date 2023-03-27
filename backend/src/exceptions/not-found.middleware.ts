import { Request, Response } from "express";
import { NotFoundError } from "./errors/not-found-error";

export function notFoundMiddleware(req: Request, res: Response) {
  console.error("Path not found", req.path);

  const notFoundError = new NotFoundError();
  res.status(notFoundError.errorCode).send(notFoundError.print())
}
