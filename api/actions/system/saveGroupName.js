import SystemHelper from '../../utils/system';
import { Instance as LoggingManager } from 'logging-manager';
import devDelay from '../../utils/devDelay.js';


export default function saveGroupName(req) {
  return new Promise((resolve, reject) => {
    return devDelay(2000).then(() => {
      const { newGroupName, groupId } = req.body;

      if (!newGroupName) {
        LoggingManager.debug('System', 'saveGroupName', 'Blank group name passed.');
        reject({
          status: 400,
          errorField: 'newGroupName',
          errorReason: `No group name was passed to edit request.`
        });
      } else if (newGroupName.length > 15) {
        LoggingManager.debug('System', 'saveGroupName', 'Invalid group name passed: ' + newGroupName);
        reject({
          status: 400,
          errorField: 'groupName',
          errorReason: `The group name is invalid. It must be 15 characters or less.`
        });
      } else {
        LoggingManager.debug('System', 'saveGroupName', `Updating group name using groupId: ${groupId} with new name ${newGroupName}`);
        SystemHelper.updateGroupName(groupId, newGroupName)
        .then(() => {
          resolve();
        }, (error) => {
          LoggingManager.error('System', 'saveGroupName', `Error occured saving group name change for groupId: ${groupId} with new name ${newGroupName}`);
          LoggingManager.error('System', 'saveGroupName', error);
          reject({
            status: 500,
            errorField: 'groupName',
            errorReason: 'An error occured while trying to save the group name change. Please check the config file as it may be out of sync and the application may require a restart.'
          });
        });
      }
    });
  });
}
