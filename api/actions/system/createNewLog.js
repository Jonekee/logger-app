import SystemHelper from '../../utils/system';
import { Instance as LoggingManager } from 'logging-manager';
import devDelay from '../../utils/devDelay.js';


export default function createNewLog(req) {
  return new Promise((resolve, reject) => {
    return devDelay(2000).then(() => {
      const { logName, groupId, logFile, logPath } = req.body;

      if (!logName) {
        LoggingManager.debug('System', 'createNewLog', 'Blank log name passed.');
        reject({
          status: 400,
          errorField: 'newLogName',
          errorReason: `No log name was passed to create request.`
        });
      } else if (!SystemHelper.groupIdIsValid(groupId)) {
        LoggingManager.debug('System', 'createNewLog', 'Invalid group ID passed.');
        reject({
          status: 400,
          errorField: 'newGroupId',
          errorReason: `Invalid group ID was passed to create request.`
        });
      } else if (!logFile) {
        LoggingManager.debug('System', 'createNewLog', 'Blank log file name passed.');
        reject({
          status: 400,
          errorField: 'newLogFile',
          errorReason: `No log file name was passed to create request.`
        });
      } else if (!logPath) {
        LoggingManager.debug('System', 'createNewLog', 'Blank log path passed.');
        reject({
          status: 400,
          errorField: 'newLogPath',
          errorReason: `No log path was passed to create request.`
        });
      } else if (logName > 15) {
        LoggingManager.debug('System', 'createNewLog', `Invalid log name passed: ${logName}`);
        reject({
          status: 400,
          errorField: 'newLogName',
          errorReason: `The log name "${logName}" is invalid. It must be 15 characters or less.`
        });
      } else {
        LoggingManager.debug('System', 'createNewLog', `Creating group using: ${logName} ${groupId} ${logFile} ${logPath}`);
        SystemHelper.createLog(logName, groupId, logFile, logPath)
        .then((newLogId) => {
          resolve({
            newLogId
          });
        }, (error) => {
          LoggingManager.error('System', 'createNewLog', `Error occured creating group using name: ${logName}`);
          LoggingManager.error('System', 'createNewLog', error);
          reject({
            status: 500,
            errorField: 'newLogName',
            errorReason: 'An error occured while trying to create group. Please check the config file as it may be out of sync and the application may require a restart.'
          });
        });
      }
    });
  });
}
