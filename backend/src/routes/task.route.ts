import Router from "express-promise-router";
import * as authService from "../services/auth.service";
import * as taskService from "../services/task.service"
import { CreateTaskSchema, UpdateTaskSchema } from "../schemas/task.schema";
import { validateSafe } from "../exceptions/helpers";
import { NotFoundError } from "../exceptions/errors/not-found-error";
import asyncHandler from 'express-async-handler'

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
    const taskDto = new CreateTaskSchema(req.body.title, req.body.userId, req.body.description, new Date(req.body.dueDate));
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
    const tasks = await taskService.readAllTasks();
    res.status(200).json(tasks);
  }))

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
    const taskId = req.params.taskId;
    if (isNaN(+taskId)) {
      throw new NotFoundError(`${taskId} not found.`)
    }
    const task = await taskService.readTask(+taskId);
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
    const taskId = req.params.taskId;
    if (isNaN(+taskId)) {
      throw new NotFoundError(`${taskId} not found.`)
    }

    const taskDto = new UpdateTaskSchema(req.body.title, req.body.description, new Date(req.body.dueDate), req.body.isChecked);

    await validateSafe(taskDto);
    const task = await taskService.updateTask(+taskId, taskDto);

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
    const taskId = req.params.taskId;
    if (isNaN(+taskId)) {
      throw new NotFoundError(`${taskId} not found.`)
    }

    await taskService.deleteTask(+taskId);

    res.status(204);
  }))

taskRouter.route("/:taskId/toggle")
  /**
   * PUT /api/v1/tasks/{taskId}/toggle
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
  .put(authService.verify, asyncHandler(async (req, res) => {
    const task = await taskService.toggleTask(req.body.taskId);
    res.status(200).json(task);
  }))
