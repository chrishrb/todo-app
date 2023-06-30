import { Logger, ILogObj } from "tslog";

// set minLevel to 0 to get all debug information
export const logger: Logger<ILogObj> = new Logger({prettyLogTimeZone: 'local', minLevel: 0});
