-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('en_us', 'de_de');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "language" "Language" NOT NULL DEFAULT 'en_us',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isChecked" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "dueDate" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Encrypt password on insert or update
CREATE FUNCTION encrpyt_password_function() 
       RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
  BEGIN
    -- A new "password" is salted and hashed.
    IF ( TG_OP = 'INSERT' OR 
         (TG_OP = 'UPDATE' AND NEW."password" <> OLD."password")
       ) 
      THEN NEW."password" = crypt(NEW."password", gen_salt('bf',12));  
    END IF;

    RETURN NEW;
  END
$$
;

CREATE TRIGGER encrpyt_password_trigger 
BEFORE INSERT OR UPDATE
ON "User" 
FOR EACH ROW 
  EXECUTE PROCEDURE encrpyt_password_function()
;

-- check_password
-- enter_pw: Password entered by user
-- db_pw: Password in db
-- Returns TRUE if the user password is correct.
CREATE 
  FUNCTION check_password(enter_pw TEXT, db_pw TEXT) 
  RETURNS BOOLEAN 
  RETURNS NULL ON NULL INPUT
  SECURITY DEFINER
  LANGUAGE SQL
AS
$$
  SELECT EXISTS
         (SELECT 1 WHERE db_pw = crypt(enter_pw, db_pw)
         );
$$
;
