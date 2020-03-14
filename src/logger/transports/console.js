export const consoleTransport = (type: string, ...args: any) => {
  /* eslint-disable no-console */
  console[type](...args);
};
