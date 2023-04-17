-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "isChecked" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "dueDate" DATETIME NOT NULL
);
