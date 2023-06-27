import { Prisma } from "@prisma/client";
import { IsBooleanString, IsEnum, IsOptional, IsString } from "class-validator";

/**
 * SortBy
 */
export enum SortBy {
  DUE_DATE = "dueDate",
  IS_CHECKED = "isChecked",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}

export class TaskReadQuerySchema {
  @IsEnum(SortBy)
  @IsOptional()
  sortBy?: SortBy;

  @IsEnum(Prisma.SortOrder)
  @IsOptional()
  orderBy?: Prisma.SortOrder;

  @IsString()
  @IsOptional()
  tag?: string;

  @IsBooleanString()
  @IsOptional()
  isChecked?: string;

  constructor(sortBy?: string, orderBy?: string, tag?: string, isChecked?: string) {
    this.sortBy = <SortBy> sortBy;
    this.orderBy = <Prisma.SortOrder>orderBy?.toLowerCase();
    this.tag = tag;
    if (isChecked === '') {
      isChecked = 'true';
    }
    this.isChecked = isChecked;
  }
}
