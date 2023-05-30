import Router from "express-promise-router";
import * as taskService from "../services/task.service"
import { CreateTaskSchema, UpdateTaskSchema } from "../schemas/task.schema";
import { validateSafe } from "../exceptions/helpers";

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
  .post(async (req, res) => {
    const taskDto = new CreateTaskSchema(req.body.title, req.body.userId, req.body.description, new Date(req.body.dueDate));

    await validateSafe(taskDto);
    const task = await taskService.createTask(taskDto);

    res.status(200).json(task);
  })
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
  .get(async (_, res) => {
    const tasks = await taskService.readAllTasks();
    res.status(200).json(tasks);
  })

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
  .get(async (req, res) => {
    const task = await taskService.readTask(req.params.taskId);
    res.status(200).json(task);
  })
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
  .put(async (req, res) => {
    const taskDto = new UpdateTaskSchema(req.body.title, req.body.description, new Date(req.body.dueDate), req.body.isChecked);

    await validateSafe(taskDto);
    const task = await taskService.updateTask(req.params.taskId, taskDto);

    res.status(200).json(task);
  })
  /**
   * DELETE /api/v1/tasks/{taskId}
   * @tags Tasks - Task endpoint
   * @summary Delete a Task
   * @security BearerAuth
   * @param {string} taskId.path - Task ID
   * @return {ReadTaskSchema} 200 - success response
   * @return {BaseError} 400 - Bad Request
   * @return {BaseError} 401 - Unauthorized error
   * @return {BaseError} 403 - Forbidden error
   * @return {BaseError} 404 - NotFound error
   * @return {BaseError} 500 - Internal Server error
   */
  .delete(async (req, res) => {
    const task = await taskService.deleteTask(req.body.taskId);

    if(req.body.taskId === task.taskId) {
      res.status(202).json(task);
    }
    res.status(204).json(task);
  })

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
  .put(async (req, res) => {
    const task = await taskService.toggleTask(req.body.taskId);
    res.status(200).json(task);
  })
