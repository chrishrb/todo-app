import express from 'express';
import { userRouter } from '../routes/user.route';
import { Server } from 'node:http';
import { errorHandlingMiddleware } from '../exceptions/error.middleware';
import { notFoundMiddleware } from '../exceptions/not-found.middleware';
import { authRouter } from '../routes/auth.route';
import { logger } from './logger';

export function createServer(port: number): Server {
  console.log(`
████████╗ ██████╗ ██████╗  ██████╗ 
╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
   ██║   ██║   ██║██║  ██║██║   ██║
   ██║   ██║   ██║██║  ██║██║   ██║
   ██║   ╚██████╔╝██████╔╝╚██████╔╝
   ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝ 
`)
  // Initialize the express engine
  const app = express();
  const startLogger = logger.getSubLogger({hideLogPositionForProduction: true})

  const apiRoute = "/api/v1"

  // middlewares - ordering is important
  app.use(express.json())
  app.use(`${apiRoute}/users`, userRouter)
  app.use(`${apiRoute}/auth`, authRouter)
  app.use(errorHandlingMiddleware)
  app.use(notFoundMiddleware)

  // Server setup
  const server = app.listen(port, () => {
    startLogger.info(`REST API running on http://localhost:${port}${apiRoute}`);
  });

  return server
}
