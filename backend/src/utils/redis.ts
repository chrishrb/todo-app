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
      logger.debug('Error: redis disconnected!');
      this.isConnected = false;
    });
    this.client.on("end", () => {
      logger.debug('Error: redis connection ended!');
      this.isConnected = false;
    });

    try {
      await this.client.connect();
      this.isConnected = true;
    } catch (e) {
      logger.error('Error: redis connect exception ', e);
      return null;
    }

    return this.client;
  }
}

export default new RedisClient();
