import Router from "express-promise-router"
import * as userService from "../services/user.service";
import { CreateUserSchema, UpdateUserSchema } from "../schemas/user.schema";
import { validateSafe } from "../exceptions/helpers";

export const userRouter = Router()

userRouter.route("/")
  .post(async (req, res) => {
    const userDto = new CreateUserSchema(req.body.email, req.body.password);

    await validateSafe(userDto);
    const user = await userService.createUser(userDto)

    res.status(201).json(user)
  })

  .get(async (req, res) => {
    const users = await userService.readAllUsers();
    res.status(200).json(users)
  })
;

userRouter.route("/:userId")
  .get(async (req, res) => {
    const user = await userService.readUser(req.params.userId);
    res.status(200).json(user)
  })
  .put(async (req, res) => {
    const userDto = new UpdateUserSchema(req.body.email, req.body.password);

    await validateSafe(userDto);
    const user = await userService.updateUser(req.params.userId, userDto);

    res.status(200).json(user)
  })
;
