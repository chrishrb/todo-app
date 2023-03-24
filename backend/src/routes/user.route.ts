import Router from "express-promise-router"
import { validate } from "class-validator";
import { createUser } from "../services/user.service";
import { CreateUserSchema } from "../schemas/user.schema";
import { ErrorSchema } from "../schemas/error.schema";

export const userRouter = Router()

userRouter.route("/")
  .post(async (req, res) => {
    const userDto = new CreateUserSchema();
    userDto.email = req.body.email;
    userDto.password = req.body.password;

    const errors = await validate(userDto);

    if (errors.length > 0) {
      res.status(400).json(new ErrorSchema(res.statusCode, errors));
      return;
    }

    // TODO: handle somehow exceptions
    const user = await createUser(userDto)

    res.status(200).json(user)
  })
