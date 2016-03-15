import SystemHelper from '../../utils/system';
import { Instance as LoggingManager } from 'logging-manager';


export default function deleteGroup(req) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { newGroupName } = req.body;

      if (!newGroupName) {
        LoggingManager.debug('System', 'deleteGroup', 'Blank group name passed.');
        reject({
          status: 400,
          errorField: 'newGroupName',
          errorReason: `No group name was passed to create request.`
        });
      } else if (newGroupName > 15) {
        LoggingManager.debug('System', 'deleteGroup', `Invalid group name passed: ${newGroupName}`);
        reject({
          status: 400,
          errorField: 'newGroupName',
          errorReason: `The group name "${newGroupName}" is invalid. It must be 15 characters or less.`
        });
      } else {
        LoggingManager.debug('System', 'deleteGroup', `Creating group using name: ${newGroupName}`);
        SystemHelper.createGroup(newGroupName)
        .then((newGroupId) => {
          console.log('NGID:' + newGroupId);
          resolve({
            newGroupId
          });
        }, (error) => {
          LoggingManager.error('System', 'deleteGroup', `Error occured creating group using name: ${newGroupName}`);
          LoggingManager.error('System', 'deleteGroup', error);
          reject({
            status: 500,
            errorField: 'newGroupName',
            errorReason: 'An error occured while trying to create group. Please check the config file as it may be out of sync and the application may require a restart.'
          });
        });
      }
    }, 2000);
  });
}
