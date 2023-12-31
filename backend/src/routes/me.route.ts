import { Router } from "express";
import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";
import * as taskService from "../services/task.service"
import * as tagService from "../services/tag.service"
import { validateSafe } from "../exceptions/helpers";
import { CreateTaskMeSchema } from "../schemas/task.schema";
import asyncHandler from 'express-async-handler'
import { TaskReadQuerySchema } from "../schemas/query.schema";

export const meRouter = Router()

meRouter.route("/")
  /**
   * GET /api/v1/me
   * @tags Me - Me endpoint
   * @tags User - User endpoint
   * @security BearerAuth
   * @summary Get infos about current logged in user
   * @return {ReadUserSchema} 200 - success response
   * @return {BaseError} 401 - Unauthorized error
   * @return {BaseError} 500 - Internal Server error
   */
  .get(authService.verify, asyncHandler(async (req, res) => {
    const userId = res.locals.user?.userId;
    const user = await userService.readUser(userId);
    res.status(200).json(user);
  }))
;

meRouter.route("/tasks")
  /**
   * GET /api/v1/me/tasks
   * @tags Me - Me endpoint
   * @tags Tasks - Task endpoint
   * @security BearerAuth
   * @summary Get tasks of current logged in user
   * @param {string} sortBy.query - sortBy - enum: dueDate,isChecked,createdAt,updatedAt
   * @param {string} orderBy.query - orderBy - enum: asc,desc
   * @param {string} tag.query - tag
   * @param {string} isChecked.query - isChecked - enum: false,true
   * @return {array<ReadTaskSchema>} 200 - success response
   * @return {BaseError} 401 - Unauthorized error
   * @return {BaseError} 500 - Internal Server error
   */
  .get(authService.verify, asyncHandler(async (req, res) => {
    const queryParams = new TaskReadQuerySchema(
      req.query.sortBy?.toString(),
      req.query.orderBy?.toString(),
      req.query.tag?.toString(),
      req.query.isChecked?.toString(),
    )
    await validateSafe(queryParams)

    const userId = res.locals.user?.userId;
    const tasks = await taskService.readAllTasksByUser(userId, queryParams);
    res.status(200).json(tasks);
  }))
  /**
   * POST /api/v1/me/tasks
   * @tags Me - Me endpoint
   * @tags Tasks - Task endpoint
   * @security BearerAuth
   * @summary Create a new Task with current user
   * @param {CreateTaskMeSchema} request.body.required - task - application/json
   * @return {ReadTaskSchema} 200 - success response
   * @return {BaseError} 400 - Validation error
   * @return {BaseError} 500 - Internal Server error
   */
  .post(authService.verify, asyncHandler(async (req, res) => {
    const userId = res.locals.user?.userId;

    const taskDto = new CreateTaskMeSchema(req.body.title, req.body.description, req.body.dueDate, req.body.tag);
    await validateSafe(taskDto);
    const task = await taskService.createTask(userId, taskDto);

    res.status(200).json(task);
  }))
;

meRouter.route("/tags")

  /**
   * GET /api/v1/me/tags
   * @tags Me - Me endpoint
   * @security BearerAuth
   * @summary Get Tags of tasks of current logged in user
   * @return {array<tags>} 200 - success response
   * @return {BaseError} 401 - Unauthorized error
   * @return {BaseError} 500 - Internal Server error
   */
  .get(authService.verify, asyncHandler(async (req, res) => {
    const userId = res.locals.user?.userId;
    const tags = await tagService.getTags(userId);
    res.status(200).json(tags);
  }))
