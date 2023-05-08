import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

class TaskSchema {

  @IsNumber()
  id: number

  @IsNotEmpty()
  title: string;

  @IsBoolean()
  isChecked: boolean

  @IsString()
  description: string;
  
  @IsDate()
  dueDate: Date;

  constructor() {
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
  constructor(title: string, description: string, dueDate: Date) {
    super();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }
}

/**
 * UpdateTaskSchema
 *
 * @typedef {object} UpdateTaskSchema
 * @property {string} title - Title
 * @property {string} description - Description
 * @property {string} duedate - Due date
 */
export class UpdateTaskSchema extends TaskSchema {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  dueDate: Date;
  
  constructor(title: string, description: string, dueDate: Date) {
    super()
    this.title = title
    this.description = description; 
    this.dueDate = dueDate;
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
  @IsNumber()
  id: number;

  constructor(title: string, description: string, dueDate: Date, isChecked: boolean) {
    super();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isChecked = isChecked;

  }
}
