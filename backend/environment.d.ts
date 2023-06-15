declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET_KEY?: string;
      REDIS_CLIENT_URL?: string;
      ADMIN_PASSWORD?: string;
      USER_PASSWORD?: string;
      NODE_ENV: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
