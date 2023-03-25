import Router from "express-promise-router"
import { createUser } from "../services/user.service";
import { CreateUserSchema } from "../schemas/user.schema";
import { validateSafe } from "../exceptions/helpers";

export const userRouter = Router()

userRouter.route("/")
  .post(async (req, res) => {
    const userDto = new CreateUserSchema();
    userDto.email = req.body.email;
    userDto.password = req.body.password;

    await validateSafe(userDto);
    const user = await createUser(userDto)

    res.status(201).json(user)
  })
