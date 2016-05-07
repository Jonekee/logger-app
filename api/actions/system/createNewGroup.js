import SystemHelper from '../../utils/system';
import { Instance as LoggingManager } from 'logging-manager';
import devDelay from '../../utils/devDelay.js';


export default function createNewGroup(req) {
  return new Promise((resolve, reject) => {
    return devDelay(2000).then(() => {
      const { newGroupName } = req.body;

      if (!newGroupName) {
        LoggingManager.debug('System', 'createNewGroup', 'Blank group name passed.');
        reject({
          status: 400,
          errorField: 'newGroupName',
          errorReason: `No group name was passed to create request.`
        });
      } else if (newGroupName.length > 15) {
        LoggingManager.debug('System', 'createNewGroup', `Invalid group name passed: ${newGroupName}`);
        reject({
          status: 400,
          errorField: 'newGroupName',
          errorReason: `The group name is invalid. It must be 15 characters or less.`
        });
      } else {
        LoggingManager.debug('System', 'createNewGroup', `Creating group using name: ${newGroupName}`);
        SystemHelper.createGroup(newGroupName)
        .then((newGroupId) => {
          resolve({
            newGroupId
          });
        }, (error) => {
          LoggingManager.error('System', 'createNewGroup', `Error occured creating group using name: ${newGroupName}`);
          LoggingManager.error('System', 'createNewGroup', error);
          reject({
            status: 500,
            errorField: 'newGroupName',
            errorReason: 'An error occured while trying to create group. Please check the config file as it may be out of sync and the application may require a restart.'
          });
        });
      }
    });
  });
}
