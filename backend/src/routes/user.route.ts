import Router from "express-promise-router"
import * as userService from "../services/user.service";
import * as authService from "../services/auth.service";
import { CreateUserSchema, UpdateUserSchema } from "../schemas/user.schema";
import { validateSafe } from "../exceptions/helpers";
import { UnauthorizedError } from "../exceptions/errors/login-error";

export const userRouter = Router()

userRouter.route("/")
  .post(async (req, res) => {
    const userDto = new CreateUserSchema(req.body.email, req.body.password, req.body.firstName, req.body.lastName);

    await validateSafe(userDto);
    const user = await userService.createUser(userDto)

    res.status(201).json(user)
  })

  .get(authService.verify, async (req, res) => {
    if (res.locals.user?.isAdmin === false) {
      throw new UnauthorizedError();
    }
    const users = await userService.readAllUsers();
    res.status(200).json(users)
  })
;

userRouter.route("/me")
  .get(authService.verify, async (req, res) => {
    const userId = res.locals.user?.userId;
    const user = await userService.readUser(userId);
    res.status(200).json(user);
  })
;

userRouter.route("/:userId")
  .get(async (req, res) => {
    const user = await userService.readUser(req.params.userId);
    res.status(200).json(user)
  })
  .put(async (req, res) => {
    const userDto = new UpdateUserSchema(req.body.email, req.body.password, req.body.firstName, req.body.lastName);

    await validateSafe(userDto);
    const user = await userService.updateUser(req.params.userId, userDto);

    res.status(200).json(user)
  })
;
