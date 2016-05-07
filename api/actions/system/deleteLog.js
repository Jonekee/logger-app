import SystemHelper from '../../utils/system';
import TailHelper from '../../utils/tailhelper';
import { Instance as LoggingManager } from 'logging-manager';
import devDelay from '../../utils/devDelay.js';


export default function deleteLog(req) {
  return new Promise((resolve, reject) => {
    return devDelay(2000).then(() => {
      const { groupId, logId } = req.body;

      if (!groupId) {
        LoggingManager.debug('System', 'deleteLog', 'Blank group ID passed.');
        reject({
          status: 400,
          errorField: 'groupId',
          errorReason: `No group ID was passed to log delete request.`
        });
      } else if (!logId) {
        LoggingManager.debug('System', 'deleteLog', 'Blank log ID passed.');
        reject({
          status: 400,
          errorField: 'logId',
          errorReason: `No log ID was passed to log delete request.`
        });
      } else if (!SystemHelper.groupIdIsValid(groupId)) {
        LoggingManager.debug('System', 'deleteLog', 'Invalid group ID passed: ' + groupId);
        reject({
          status: 400,
          errorField: 'groupId',
          errorReason: `Invalid group ID was passed to log delete request. No group exists for the ID "${groupId}".`
        });
      } else if (!SystemHelper.logIdIsValid(logId)) {
        LoggingManager.debug('System', 'deleteLog', 'Invalid log ID passed: ' + logId);
        reject({
          status: 400,
          errorField: 'logId',
          errorReason: `Invalid log ID was passed to log delete request. No log exists for the ID "${logId}".`
        });
      } else {
        LoggingManager.debug('System', 'deleteLog', `Deleting log using groupId ${groupId} and logId ${logId}`);
        TailHelper.killListener(logId);
        SystemHelper.deleteLog(groupId, logId)
        .then(() => {
          resolve();
        }, (error) => {
          LoggingManager.error('System', 'deleteLog', `Error occured deleting group using groupId ${groupId} and logId ${logId}`);
          LoggingManager.error('System', 'deleteLog', error);
          reject({
            status: 500,
            errorField: 'logId',
            errorReason: 'An error occured while trying to delete log. Please check the config file as it may be out of sync and the application may require a restart.'
          });
        });
      }
    });
  });
}
