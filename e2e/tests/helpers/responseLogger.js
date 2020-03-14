import { RequestLogger } from 'testcafe';
import { backendBaseUrl } from './constants';

console.log(backendBaseUrl);

const options = { logResponseBody: true, logResponseHeaders: true, stringifyResponseBody: true };
const logger = RequestLogger(backendBaseUrl, options);

export { logger };
