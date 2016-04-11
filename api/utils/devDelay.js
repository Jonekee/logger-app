import { Instance as LoggingManager } from 'logging-manager';

/*
 *  This function is used in development to delay API responses in order to
 *  test loading panels. Using the __DEVELOPMENT__ keyword should remove this
 *  code completely in production.
 */
export default function devDelay(delay) {
  return new Promise(resolve => {
    if (__DEVELOPMENT__) {
      LoggingManager.debug('System', 'devDelay', 'Using development API delay timer.');
      setTimeout(resolve, delay);
    } else {
      resolve();
    }
  });
}
