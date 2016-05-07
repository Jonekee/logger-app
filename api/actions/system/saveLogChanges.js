import SystemHelper from '../../utils/system';
import { Instance as LoggingManager } from 'logging-manager';
import devDelay from '../../utils/devDelay.js';


export default function saveLogChanges(req) {
  return new Promise((resolve, reject) => {
    return devDelay(2000).then(() => {
      const { logId, oldGroupId, editedName, editedGroupId, editedFile, editedPath } = req.body;

      if (!editedName) {
        LoggingManager.debug('System', 'saveLogChanges', 'Blank log name passed.');
        reject({
          status: 400,
          errorField: 'newLogName',
          errorReason: `No log name was passed to edit log request.`
        });
      } else if (editedName.length > 15) {
        LoggingManager.debug('System', 'saveLogChanges', `Invalid log name passed: ${editedName}`);
        reject({
          status: 400,
          errorField: 'newLogName',
          errorReason: `The log name "${editedName}" is invalid. It must be 15 characters or less.`
        });
      } else if (editedGroupId && !SystemHelper.groupIdIsValid(editedGroupId)) {
        LoggingManager.debug('System', 'saveLogChanges', 'Invalid group ID passed.');
        reject({
          status: 400,
          errorField: 'newGroupId',
          errorReason: `Invalid group ID was passed to edit log request. No group exists for that ID.`
        });
      } else if (!editedFile) {
        LoggingManager.debug('System', 'saveLogChanges', 'Blank log file name passed.');
        reject({
          status: 400,
          errorField: 'newLogFile',
          errorReason: `No log file name was passed to edit log request.`
        });
      } else if (editedFile.length > 1000) {
        LoggingManager.debug('System', 'saveLogChanges', `Invalid log file passed: ${editedFile}`);
        reject({
          status: 400,
          errorField: 'newLogFile',
          errorReason: `The log file name "${editedFile}" is invalid. It must be 1000 characters or less.`
        });
      } else if (!editedPath) {
        LoggingManager.debug('System', 'saveLogChanges', 'Blank log path passed.');
        reject({
          status: 400,
          errorField: 'newLogPath',
          errorReason: `No log file path was passed to edit log request.`
        });
      } else if (editedPath.length > 1000) {
        LoggingManager.debug('System', 'saveLogChanges', `Invalid log file path passed: ${editedPath}`);
        reject({
          status: 400,
          errorField: 'newLogPath',
          errorReason: `The log file path "${editedPath}" is invalid. It must be 1000 characters or less.`
        });
      } else {
        LoggingManager.debug('System', 'saveLogChanges', `Editing log with ID: ${logId}`);
        SystemHelper.updateLog(logId, oldGroupId, editedName, editedGroupId, editedFile, editedPath)
        .then(() => {
          resolve();
        }, (error) => {
          LoggingManager.error('System', 'saveLogChanges', `Error occured editing log with ID: ${logId}`);
          LoggingManager.error('System', 'saveLogChanges', error);
          reject({
            status: 500,
            errorField: 'newLogName',
            errorReason: 'An error occured while trying to edit the log. Please check the config file as it may be out of sync and the application may require a restart.'
          });
        });
      }
    });
  });
}
