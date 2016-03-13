import SystemHelper from '../../utils/system';
import { Instance as LoggingManager } from 'logging-manager';


export default function deleteGroup(req) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { groupId } = req.body;

      if (!groupId) {
        LoggingManager.debug('System', 'deleteGroup', 'Blank group ID passed.');
        reject({
          status: 400,
          errorField: 'groupId',
          errorReason: `No group ID was passed to delete request.`
        });
      } else if (!SystemHelper.groupIdIsValid(groupId)) {
        LoggingManager.debug('System', 'deleteGroup', 'Invalid group ID passed: ' + groupId);
        reject({
          status: 400,
          errorField: 'groupId',
          errorReason: `The group ID "${groupId}" is invalid. No group exists for that ID.`
        });
      } else {
        LoggingManager.debug('System', 'deleteGroup', `Deleting group using groupId: ${groupId}`);
        SystemHelper.deleteGroup(groupId)
        .then(() => {
          resolve();
        }, (error) => {
          LoggingManager.error('System', 'deleteGroup', `Error occured deleting group using groupId: ${groupId}`);
          LoggingManager.error('System', 'deleteGroup', error);
          reject({
            status: 500,
            errorField: 'groupName',
            errorReason: 'An error occured while trying to delete group. Please check the config file as it may be out of sync and the application may require a restart.'
          });
        });
      }
    }, 2000);
  });
}
