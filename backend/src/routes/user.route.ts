import Router from "express-promise-router"
import * as userService from "../services/user.service";
import * as authService from "../services/auth.service";
import { CreateUserSchema, UpdateUserSchema } from "../schemas/user.schema";
import { validateSafe } from "../exceptions/helpers";
import { UnauthorizedError } from "../exceptions/errors/login-error";

export const userRouter = Router()

userRouter.route("/")
  /**
   * POST /api/v1/users
   * @tags User - User endpoint
   * @summary Create a new user
   * @param {CreateUserSchema} request.body.required - user - application/json
   * @return {ReadUserSchema} 200 - success response
   * @return {BaseError} 400 - Validation error
   * @return {BaseError} 500 - Internal Server error
   */
  .post(async (req, res) => {
    const userDto = new CreateUserSchema(req.body.email, req.body.password, req.body.firstName, req.body.lastName);

    await validateSafe(userDto);
    const user = await userService.createUser(userDto)

    res.status(201).json(user)
  })

  /**
   * GET /api/v1/users
   * @tags User - User endpoint
   * @security BearerAuth
   * @summary Get all users
   * @return {array<ReadUserSchema>} 200 - success response
   * @return {BaseError} 401 - Unauthorized error
   * @return {BaseError} 403 - Forbidden error
   * @return {BaseError} 500 - Internal Server error
   */
  .get(authService.verify, async (req, res) => {
    if (res.locals.user?.isAdmin === false) {
      throw new UnauthorizedError();
    }
    const users = await userService.readAllUsers();
    res.status(200).json(users)
  })
;

/**
 * GET /api/v1/users/me
 * @tags User - User endpoint
 * @security BearerAuth
 * @summary Get current logged in user
 * @return {ReadUserSchema} 200 - success response
 * @return {BaseError} 403 - Forbidden error
 * @return {BaseError} 500 - Internal Server error
 */
userRouter.route("/me")
  .get(authService.verify, async (req, res) => {
    const userId = res.locals.user?.userId;
    const user = await userService.readUser(userId);
    res.status(200).json(user);
  })
;

/**
 * GET /api/v1/users/{userId}
 * @tags User - User endpoint
 * @summary Get user by id
 * @security BearerAuth
 * @param {string} userId.path - userId
 * @return {ReadUserSchema} 200 - success response
 * @return {BaseError} 401 - Unauthorized error
 * @return {BaseError} 403 - Forbidden error
 * @return {BaseError} 404 - Not Found error
 * @return {BaseError} 500 - Internal Server error
 */
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
