import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import actuator, { InfoGitMode } from 'express-actuator';
import redisClient from '../utils/redis';

const prisma = new PrismaClient()

/**
 * ActuatorHealthSchema
 *
 * @typedef {object} ActuatorHealthSchema
 * @property {string} status - Status
 * @property {object} details - Details
 */

/**
 * ActuatorInfoBuildSchema
 *
 * @typedef {object} ActuatorInfoBuildSchema
 * @property {string} description - Description
 * @property {string} name - Name
 * @property {string} version - Version
 */
/**
 * ActuatorInfoSchema
 *
 * @typedef {object} ActuatorInfoSchema
 * @property {ActuatorInfoBuildSchema} build - Build Infos
 */

/**
 * ActuatorMetricsSchema
 *
 * @typedef {object} ActuatorMetricsSchema
 * @property {object} mem - Memory
 * @property {string} uptime - Uptime
 */

/**
 * GET /actuator/health
 * @tags Actuator - Infos about system
 * @summary Check health status
 * @return {ActuatorHealthSchema} 200 - success response
 * @return {BaseError} 500 - Internal Server error
 */
/**
 * GET /actuator/info
 * @tags Actuator - Infos about system
 * @summary Get infos about backend
 * @return {ActuatorHealthSchema} 200 - success response
 * @return {BaseError} 500 - Internal Server error
 */
/**
 * GET /actuator/metrics
 * @tags Actuator - Infos about system
 * @summary Get metrics about backend
 * @return {ActuatorMetricsSchema} 200 - success response
 * @return {BaseError} 500 - Internal Server error
 */
const options = {
  basePath: '/actuator',
  infoGitMode: 'simple' as InfoGitMode,
  customEndpoints: [
    {
      id: 'health',
      controller: async (req: Request, res: Response) => {
        let status = 200;
        let postgresStatus = 'UP';
        let redisStatus = 'UP';

        try {
          await prisma.$queryRaw `SELECT 1`;
        } catch (_) {
          postgresStatus = 'DOWN'
          status = 500;
        }

        try {
          await redisClient.getConnection()
        } catch (_) {
          redisStatus = 'DOWN'
          status = 500;
        }

        res.status(status).json({
          status: status === 200 ? 'UP' : 'DOWN',
          details: {
            postgres: postgresStatus,
            redis: redisStatus,
          }
        })
      }
    }
  ]
}

export default actuator(options);
