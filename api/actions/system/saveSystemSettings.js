import SystemHelper from '../../utils/system';
import { Instance as LoggingManager } from 'logging-manager';

// TODO ## : Add a way of extracting this from the logging-manager
const validLogLevels = [
  'SYSTEM',
  'FATAL',
  'ERROR',
  'INFO',
  'DEBUG',
  'TRACE'
];

function validatePort(portValue) {
  return !isNaN(parseInt(portValue, 10))
    && (portValue % 1 === 0)
    && (portValue >= 0)
    && (portValue <= 65535);
}

export default function saveSystemSettings(req) {
  return new Promise((resolve, reject) => {
    const newWebPort = req.body.newWebPort;
    const newApiPort = req.body.newApiPort;
    const newLogLevel = req.body.newLogLevel;

    if (!validatePort(newWebPort)) {
      LoggingManager.debug('System', 'saveSystemSettings', 'Invalid web port passed: ' + newWebPort);
      reject({
        status: 400,
        errorField: 'webport',
        errorReason: 'The Web Port you provided is invalid. It should be an interger in the range 0 to 65535.'
      });
    } else if (!validatePort(newApiPort)) {
      LoggingManager.debug('System', 'saveSystemSettings', 'Invalid api port passed: ' + newApiPort);
      reject({
        status: 400,
        errorField: 'apiport',
        errorReason: 'The API Port you provided is invalid. It should be an interger in the range 0 to 65535.'
      });
    } else if (newWebPort === newApiPort) {
      LoggingManager.debug('System', 'saveSystemSettings', 'Same value passed for both ports: ' + newWebPort);
      reject({
        status: 401,
        errorField: 'apiport',
        errorReason: 'The API port and Web port must be different values.'
      });
    } else if (!~validLogLevels.indexOf(newLogLevel)) {
      LoggingManager.debug('System', 'saveSystemSettings', 'Invalid log level passed: ' + newLogLevel);
      reject({
        status: 401,
        errorField: 'loglevel',
        errorReason: 'The Log Level you provided is invalid. Please select one of the values provided.'
      });
    } else {
      LoggingManager.info('System', 'saveSystemSettings', 'Updating System settings.');
      SystemHelper.updateSystemSettings(newWebPort, newApiPort, newLogLevel)
      .then(() => {
        resolve();
      }, (error) => {
        LoggingManager.error('System', 'saveSystemSettings', 'Error occured saving system settings change.');
        LoggingManager.error('System', 'saveSystemSettings', error);
        reject({
          status: 500,
          errorField: 'untraceable',
          errorReason: 'An error occured while trying to save the app settings changes to the system config file. Please check the config file as it may be out of sync and the application may require a restart.'
        });
      });
    }
  });
}
