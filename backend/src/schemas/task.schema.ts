import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

class TaskSchema {

  @IsString()
  title: string;

  @IsBoolean()
  isChecked?: boolean

  constructor(title: string) {
    this.title = title;
    this.isChecked = false;
 }
}

/**
 * CreateTaskSchema
 *
 * @typedef {object} CreateTaskSchema
 * @property {string} title.required - Title
 * @property {string} description - Description
 * @property {string} duedate - Due date
 */
export class CreateTaskSchema extends TaskSchema {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string | null; 

  @IsOptional()
  dueDate: Date | null;

  @IsUUID(4)
  userId: string;

  constructor(title: string, userId: string, description: string | null, dueDate: Date | null) {
    super(title)
    this.userId = userId,
    this.description = description,
    this.dueDate = dueDate
  }
}

/**
 * UpdateTaskSchema
 *
 * @typedef {object} UpdateTaskSchema
 * @property {string} title - Title
 * @property {string} description - Description
 * @property {string} duedate - Due date
 * @property {boolean} isChecked - Is completed?
 */
export class UpdateTaskSchema extends TaskSchema {

  @IsString()
  description: string | null;

  @IsDate()
  dueDate: Date | null;

  @IsBoolean()
  isChecked: boolean;
  
  constructor(title: string, description: string | null, dueDate: Date | null, isChecked: boolean) {
    super(title);
    this. description = description;
    this.dueDate = dueDate;
    this.isChecked = isChecked;
  }
}

/**
 * ReadTaskSchema
 *
 * @typedef {object} ReadTaskSchema
 * @property {number} id - ID
 * @property {string} title - Title
 * @property {string} description - Description
 * @property {string} dueDate - Due date
 */
export class ReadTaskSchema extends TaskSchema {

  @IsUUID(4)
  taskId: string;

  @IsUUID(4)
  userId: string;

  @IsOptional()
  description: string | null;

  @IsOptional()
  @IsDate()
  dueDate: Date | null;

  @IsBoolean()
  isChecked: boolean;

  constructor(taskId: string, userId: string, title: string, description: string | null, dueDate: Date | null, isChecked: boolean) {
    super(title);
    this.taskId = taskId;
    this.userId = userId;
    this.description = description;
    this.dueDate = dueDate,
    this.isChecked = isChecked;
  }
}
