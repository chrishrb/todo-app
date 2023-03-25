import express from 'express';
import { userRouter } from '../routes/user.route';
import { Server } from 'node:http';

export function createServer(port: number): Server {
  // Initialize the express engine
  const app = express();

  const apiRoute = "/api/v1"

  // middlewares
  app.use(express.json())

  // routes
  app.use(`${apiRoute}/user`, userRouter)

  // Server setup
  const server = app.listen(port, () => {
    console.log(`REST API running on http://localhost:${port}${apiRoute}`);
  });

  return server
}
