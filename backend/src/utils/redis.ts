import { createClient } from "redis";
import { logger } from "./logger";

class RedisClient {
  private client: any;
  private isConnected = false;

  constructor() {
    this.client = null;
  }

  public async getConnection() {
    if (this.isConnected) {
      return this.client;
    }

    this.client = createClient({url: process.env.REDIS_CLIENT_URL});

    this.client.on("ready", () => {
      this.isConnected = true;
    });
    this.client.on("error", () => {
      logger.error('Error: redis disconnected!');
      this.isConnected = false;
      throw new Error("Error: redis disconnected")
    });
    this.client.on("end", () => {
      logger.error('Error: redis connection ended!');
      this.isConnected = false;
      throw new Error("Error: redis disconnected")
    });

    await this.client.connect();
    this.isConnected = true;

    return this.client;
  }
}

export default new RedisClient();
