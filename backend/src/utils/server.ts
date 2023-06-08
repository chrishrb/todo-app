import express from 'express';
import { userRouter } from '../routes/user.route';
import { Server } from 'node:http';
import { errorHandlingMiddleware } from '../exceptions/error.middleware';
import { notFoundMiddleware } from '../exceptions/not-found.middleware';
import { authRouter } from '../routes/auth.route';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import { swaggerOptions } from './swagger';
import { logger } from './logger';
import { InternalError } from '../exceptions/errors/internal-error';
import cookieParser from 'cookie-parser';
import { taskRouter } from '../routes/task.route';
import { meRouter } from '../routes/me.route';

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

  // Swagger
  expressJSDocSwagger(app)(swaggerOptions);

  // middlewares - ordering is important
  app.use(express.json())
  app.use(cookieParser())
  app.use(`${apiRoute}/users`, userRouter)
  app.use(`${apiRoute}/tasks`, taskRouter)
  app.use(`${apiRoute}/me`, meRouter)
  app.use(`${apiRoute}/auth`, authRouter)
  app.use(errorHandlingMiddleware)
  app.use(notFoundMiddleware)

  if (!process.env.AUTH_SECRET_KEY) {
    throw new InternalError([{field: 'AUTH_SECRET_KEY', replyMessage: "Authentication does not work. No AUTH_SECRET_KEY found in env."}]);
  }

  // Server setup
  const server = app.listen(port, () => {
    startLogger.info(`REST API running on http://localhost:${port}${apiRoute}`);
  });

  return server
}
