import Router from "express-promise-router";
import * as taskService from "../services/task.service"
import { CreateTaskSchema, UpdateTaskSchema } from "../schemas/task.schema";
import { validateSafe } from "../exceptions/helpers";

export const taskRouter = Router()

taskRouter.route("/")
  .post(async (req, res) => {
    const taskDto = new CreateTaskSchema(req.body.title, req.body.description, req.body.dueDate);

    await validateSafe(taskDto);
    const task = await taskService.crateTask(taskDto);

    res.status(200).json(task);
  })
  .get(async (_, res) => {
    const tasks = taskService.readAllTasks();
    res.status(200).json(tasks);
  })

taskRouter.route("/:taskId")
  .get(async (req, res) => {
    const task = await taskService.readTask(req.body.taskId);
    res.status(200).json(task);
  })
  .put(async (req, res) => {
    const taskDto = new UpdateTaskSchema(req.body.title, req.body.description, req.body.dueDate);

    await validateSafe(taskDto);
    const task = await taskService.updateTask(req.body.taskId, taskDto);

    res.status(200).json(task);
  })

