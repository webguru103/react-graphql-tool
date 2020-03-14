import { TRACE, LEVELS } from './constants';
import { consoleTransport } from './transports/console';

type OptionsType = {
  level?: number,
  transports?: {[string]: Function},
}

class Logger {

  constructor(options: OptionsType) {
    this.config = {
      level: options.level || TRACE,
      transports: options.transports || { console: consoleTransport },
    };
  }

  logByTransports = (type: string, ...args: any) => {
    const { transports, level } = this.config;
    if (LEVELS[type] >= level) {
      Object.keys(transports).forEach((transp) => {
        transports[transp](type, ...args);
      });
    }
  };

  config: { level: number, transports: {[string]: Function} }

  log = (...args: any) => {
    this.logByTransports('log', ...args);
  };

  info = (...args: any) => {
    this.logByTransports('info', ...args);
  };

  warn = (...args: any) => {
    this.logByTransports('warn', ...args);
  };

  error = (...args: any) => {
    this.logByTransports('error', ...args);
  };

  trace = (...args: any) => {
    this.logByTransports('trace', ...args);
  };

}

export default Logger;
