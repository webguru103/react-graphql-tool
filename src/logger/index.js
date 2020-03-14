import Logger from './logger';
import { LOGLEVEL } from '../configurations';

const logger = new Logger({ level: Number(LOGLEVEL) || 1 });

export { logger };
