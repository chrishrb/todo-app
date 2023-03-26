import Router from "express-promise-router"
import * as authService from "../services/auth.service";
import { CreateUserSchema } from "../schemas/user.schema";
import { validateSafe } from "../exceptions/helpers";
import { ValidationError } from "../exceptions/errors/validation-error";
import { JwtVerifySchema } from "../schemas/auth.schema";

export const authRouter = Router()

authRouter.route("/login")
  .post(async (req, res) => {
    const userDto = new CreateUserSchema(req.body.email, req.body.password);

    await validateSafe(userDto);
    const jwt = await authService.login(userDto)

    res.status(200).json(jwt)
  })

authRouter.route("/verify")
  .get(async (req, res) => {
    const access_token = req.query.access_token
    if (access_token == null || typeof access_token != 'string') {
      throw new ValidationError("No access_token in request found.")
    }
    const jwt = new JwtVerifySchema(access_token);
    await validateSafe(jwt);

    await authService.verify(jwt)
    res.status(200).json(jwt)
  })
