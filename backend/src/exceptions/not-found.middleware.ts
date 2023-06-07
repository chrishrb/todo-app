import { Request, Response } from "express";
import { NotFoundError } from "./errors/not-found-error";
import { logger } from "../utils/logger";

export function notFoundMiddleware(req: Request, res: Response) {
  logger.error("Path not found", req.path);

  const notFoundError = new NotFoundError([{field: 'path', value: req.path, error: 'Path not found.'}]);
  res.status(notFoundError.errorCode).send(notFoundError.print())
}
