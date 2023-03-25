import express from 'express';
import { userRouter } from '../routes/user.route';
import { Server } from 'node:http';
import { errorHandlingMiddleware } from '../exceptions/error.middleware';

export function createServer(port: number): Server {
  // Initialize the express engine
  const app = express();

  const apiRoute = "/api/v1"

  // middlewares - ordering is important
  app.use(express.json())
  app.use(`${apiRoute}/user`, userRouter)
  app.use(errorHandlingMiddleware)

  // Server setup
  const server = app.listen(port, () => {
    console.log(`REST API running on http://localhost:${port}${apiRoute}`);
  });

  return server
}
