import Router from "express-promise-router"
import * as authService from "../services/auth.service";
import { CreateUserSchema } from "../schemas/user.schema";
import { validateSafe } from "../exceptions/helpers";

export const authRouter = Router()

authRouter.route("/login")
  .post(async (req, res) => {
    const userDto = new CreateUserSchema(req.body.email, req.body.password);

    await validateSafe(userDto);
    const jwt = await authService.login(userDto)

    res.status(200).json(jwt)
  })

authRouter.route("/verify")
  .get(authService.verify, async (req, res) => {
    res.status(200).json(res.locals.user)
  })

// TODO: add refresh endpoint
