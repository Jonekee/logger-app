export const NEW_GROUP_EMITTED = 'logger-app/groups/NEW_GROUP_EMITTED';
export const GROUP_NAME_CHANGE_EMITTED = 'logger-app/groups/GROUP_NAME_CHANGE_EMITTED';
export const GROUP_DELETE_EMITTED = 'logger-app/sharedActions/GROUP_DELETE_EMITTED';
export const NEW_LOG_EMITTED = 'logger-app/sharedActions/NEW_LOG_EMITTED';
export const LOG_DELETE_EMITTED = 'logger-app/sharedActions/LOG_DELETE_EMITTED';


export function newGroupEmitted(newGroupId, newGroupName) {
  return {
    type: NEW_GROUP_EMITTED,
    newGroupId,
    newGroupName
  };
}

export function groupNameChangeEmitted(groupId, newName, oldName) {
  return {
    type: GROUP_NAME_CHANGE_EMITTED,
    groupId,
    newName,
    oldName
  };
}

export function groupDeleteEmitted(groupId, logIds, groupName) {
  return {
    type: GROUP_DELETE_EMITTED,
    groupId,
    logIds,
    groupName
  };
}

export function newLogEmitted(newLogId, logName, groupId, logFile, logPath, groupName) {
  return {
    type: NEW_LOG_EMITTED,
    newLogId,
    logName,
    groupId,
    logFile,
    logPath,
    groupName
  };
}

export function logDeleteEmitted(groupId, logId) {
  return {
    type: LOG_DELETE_EMITTED,
    groupId,
    logId
  };
}
