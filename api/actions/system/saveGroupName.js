import SystemHelper from '../../utils/system';
import { Instance as LoggingManager } from 'logging-manager';


export default function saveGroupName(req) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(req.body);
      const { name, groupId} = req.body;

      if (!name || name.length > 15) {
        console.log(!name);
        console.log(name.length < 15);
        LoggingManager.debug('System', 'saveGroupName', 'Invalid group name passed: ' + name);
        reject({
          status: 400,
          errorField: 'groupName',
          errorReason: `The group name "${name}" is invalid. It\'s length must be between 1 and 15 characters.`
        });
      } else {
        LoggingManager.debug('System', 'saveGroupName', `Updating group name using groupId: ${groupId} with new name ${name}`);
        SystemHelper.updateGroupName(groupId, name)
        .then(() => {
          resolve();
        }, (error) => {
          LoggingManager.error('System', 'saveGroupName', `Error occured saving group name change for groupId: ${groupId} with new name ${name}`);
          LoggingManager.error('System', 'saveGroupName', error);
          reject({
            status: 500,
            errorField: 'groupName',
            errorReason: 'An error occured while trying to save the group name change. Please check the config file as it may be out of sync and the application may require a restart.'
          });
        });
      }
    }, 2000);
  });
}
