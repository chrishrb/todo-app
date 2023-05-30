import Router from "express-promise-router"
import * as userService from "../services/user.service";
import * as authService from "../services/auth.service";
import { CreateUserSchema, UpdateUserSchema } from "../schemas/user.schema";
import { validateSafe } from "../exceptions/helpers";
import { ForbiddenError } from "../exceptions/errors/login-error";
import asyncHandler from 'express-async-handler'

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
  .post(asyncHandler(async (req, res) => {
    const userDto = new CreateUserSchema(req.body.email, req.body.password, req.body.firstName, req.body.lastName);

    await validateSafe(userDto);
    const user = await userService.createUser(userDto)

    res.status(201).json(user)
  }))

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
  .get(authService.verify, asyncHandler(async (req, res) => {
    if (res.locals.user?.isAdmin === false) {
      throw new ForbiddenError();
    }
    const users = await userService.readAllUsers();
    res.status(200).json(users)
  }))
;

userRouter.route("/:userId")
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
  .get(authService.verify, asyncHandler(async (req, res) => {
    if (res.locals.user?.userId !== req.params.userId && res.locals.user?.isAdmin === false) {
      throw new ForbiddenError();
    }
    const user = await userService.readUser(req.params.userId);
    res.status(200).json(user)
  }))
  /**
   * PUT /api/v1/users/{userId}
   * @tags User - User endpoint
   * @summary Update user by id
   * @security BearerAuth
   * @param {string} userId.path - userId
   * @return {ReadUserSchema} 200 - success response
   * @return {BaseError} 401 - Unauthorized error
   * @return {BaseError} 403 - Forbidden error
   * @return {BaseError} 404 - Not Found error
   * @return {BaseError} 500 - Internal Server error
   */
  .put(authService.verify, asyncHandler(async (req, res) => {
    if (res.locals.user?.userId !== req.params.userId && res.locals.user?.isAdmin === false) {
      throw new ForbiddenError();
    }
    const userDto = new UpdateUserSchema(req.body.email, req.body.password, req.body.firstName, req.body.lastName);

    await validateSafe(userDto);
    const user = await userService.updateUser(req.params.userId, userDto);

    res.status(200).json(user)
  }))
  /**
   * DELETE /api/v1/users/{userId}
   * @tags User - User endpoint
   * @summary Delete user by id
   * @security BearerAuth
   * @param {string} userId.path - userId
   * @return 204 - success response
   * @return {BaseError} 401 - Unauthorized error
   * @return {BaseError} 403 - Forbidden error
   * @return {BaseError} 404 - Not Found error
   * @return {BaseError} 500 - Internal Server error
   */
  .delete(authService.verify, asyncHandler(async (req, res) => {
    if (res.locals.user?.userId !== req.params.userId && res.locals.user?.isAdmin === false) {
      throw new ForbiddenError();
    }
    await userService.deleteUser(req.params.userId);

    res.status(204).send()
  }))
;
