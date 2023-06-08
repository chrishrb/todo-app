import Router from "express-promise-router";
import * as authService from "../services/auth.service";
import * as taskService from "../services/task.service"
import { CreateTaskSchema, UpdateTaskSchema } from "../schemas/task.schema";
import { validateSafe } from "../exceptions/helpers";
import asyncHandler from 'express-async-handler'
import { ForbiddenError } from "../exceptions/errors/login-error";
import { JwtPayloadSchema } from "../schemas/auth.schema";

function isUserPermitted(user?: JwtPayloadSchema, taskUserId?: string): boolean {
  if (!user) {
    return false;
  }
  if (user.userId === taskUserId || user.isAdmin === true) {
    return true;
  }
  return false;
}

export const taskRouter = Router()

taskRouter.route("/")
  /**
   * POST /api/v1/tasks
   * @tags Tasks - Task endpoint
   * @summary Create a new Task
   * @security BearerAuth
   * @param {CreateTaskSchema} request.body.required - task - application/json
   * @return {ReadTaskSchema} 200 - success response
   * @return {BaseError} 400 - Validation error
   * @return {BaseError} 500 - Internal Server error
   */
  .post(authService.verify, asyncHandler(async (req, res) => {
    const taskDto = new CreateTaskSchema(req.body.title, req.body.userId, req.body.description, req.body.dueDate);
    await validateSafe(taskDto);

    const task = await taskService.createTask(taskDto.userId, taskDto);

    res.status(200).json(task);
  }))
  /**
   * GET /api/v1/tasks
   * @tags Tasks - Task endpoint
   * @summary Get all Tasks
   * @security BearerAuth
   * @return {array<ReadTaskSchema>} 200 - success response
   * @return {BaseError} 401 - Unauthorized error
   * @return {BaseError} 403 - Forbidden error
   * @return {BaseError} 500 - Internal Server error
   */
  .get(authService.verify, asyncHandler(async (_, res) => {
    if (res.locals.user?.isAdmin === false) {
      throw new ForbiddenError([{field: 'id', value: res.locals.user.userId, replyMessage: 'User does not have sufficient permissions.'}]);
    }
    const tasks = await taskService.readAllTasks();
    res.status(200).json(tasks);
  }));

taskRouter.route("/:taskId")
  /**
   * GET /api/v1/tasks/{taskId}
   * @tags Tasks - Task endpoint
   * @summary Get specific task
   * @security BearerAuth
   * @param {string} taskId.path - Task ID
   * @return {ReadTaskSchema} 200 - success response
   * @return {BaseError} 401 - Unauthorized error
   * @return {BaseError} 403 - Forbidden error
   * @return {BaseError} 404 - NotFound error
   * @return {BaseError} 500 - Internal Server error
   */
  .get(authService.verify, asyncHandler(async (req, res) => {
    const task = await taskService.readTask(req.params.taskId);
    if (!isUserPermitted(res.locals.user, task.userId)) {
      throw new ForbiddenError([{field: 'id', value: res.locals.user.userId, replyMessage: 'User does not have permissions for this resource.'}]);
    }
    res.status(200).json(task);
  }))
  /**
   * PUT /api/v1/tasks/{taskId}
   * @tags Tasks - Task endpoint
   * @summary Update a Task
   * @security BearerAuth
   * @param {string} taskId.path - Task ID
   * @param {UpdateTaskSchema} request.body.required - Update Task schema
   * @return {ReadTaskSchema} 200 - success response
   * @return {BaseError} 400 - Bad Request
   * @return {BaseError} 401 - Unauthorized error
   * @return {BaseError} 403 - Forbidden error
   * @return {BaseError} 404 - NotFound error
   * @return {BaseError} 500 - Internal Server error
   */
  .put(authService.verify, asyncHandler(async (req, res) => {
    const readTask = await taskService.readTask(req.params.taskId);
    if (!isUserPermitted(res.locals.user, readTask.userId)) {
      throw new ForbiddenError([{field: 'id', value: res.locals.user.userId, replyMessage: 'User does not have permissions for this resource.'}]);
    }

    const taskDto = new UpdateTaskSchema(req.body.title, req.body.description, req.body.dueDate, req.body.isChecked);
    await validateSafe(taskDto);
    const task = await taskService.updateTask(req.params.taskId, taskDto);

    res.status(200).json(task);
  }))
  /**
   * DELETE /api/v1/tasks/{taskId}
   * @tags Tasks - Task endpoint
   * @summary Delete a Task
   * @security BearerAuth
   * @param {string} taskId.path - Task ID
   * @return 204 - success response
   * @return {BaseError} 400 - Bad Request
   * @return {BaseError} 401 - Unauthorized error
   * @return {BaseError} 403 - Forbidden error
   * @return {BaseError} 404 - NotFound error
   * @return {BaseError} 500 - Internal Server error
   */
  .delete(authService.verify, asyncHandler(async (req, res) => {
    const readTask = await taskService.readTask(req.params.taskId);
    if (!isUserPermitted(res.locals.user, readTask.userId)) {
      throw new ForbiddenError([{field: 'id', value: res.locals.user.userId, replyMessage: 'User does not have permissions for this resource.'}]);
    }

    await taskService.deleteTask(req.params.taskId);
    res.status(204).send();
  }));

taskRouter.route("/:taskId/toggle")
  /**
   * PATCH /api/v1/tasks/{taskId}/toggle
   * @tags Tasks - Task endpoint
   * @summary Toggle the isChecked field
   * @security BearerAuth
   * @param {string} taskId.path - Task ID
   * @return {ReadTaskSchema} 200 - success response
   * @return {BaseError} 400 - Bad Request
   * @return {BaseError} 401 - Unauthorized error
   * @return {BaseError} 403 - Forbidden error
   * @return {BaseError} 404 - NotFound error
   * @return {BaseError} 500 - Internal Server error
   */
  .patch(authService.verify, asyncHandler(async (req, res) => {
    const readTask = await taskService.readTask(req.params.taskId);
    if (!isUserPermitted(res.locals.user, readTask.userId)) {
      throw new ForbiddenError([{field: 'id', value: res.locals.user.userId, replyMessage: 'User does not have permissions for this resource.'}]);
    }

    const task = await taskService.toggleTask(req.params.taskId, readTask.isChecked);
    res.status(200).json(task);
  }));
