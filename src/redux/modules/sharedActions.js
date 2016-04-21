// Socket events
export const NEW_GROUP_EMITTED = 'logger-app/sharedActions/NEW_GROUP_EMITTED';
export const GROUP_NAME_CHANGE_EMITTED = 'logger-app/sharedActions/GROUP_NAME_CHANGE_EMITTED';
export const GROUP_DELETE_EMITTED = 'logger-app/sharedActions/GROUP_DELETE_EMITTED';
export const NEW_LOG_EMITTED = 'logger-app/sharedActions/NEW_LOG_EMITTED';
export const LOG_DELETE_EMITTED = 'logger-app/sharedActions/LOG_DELETE_EMITTED';
export const TAIL_ERROR_EMITTED = 'logger-app/sharedActions/TAIL_ERROR_EMITTED';

// API events
export const CREATE_NEW_GROUP_FAIL = 'logger-app/sharedActions/CREATE_NEW_GROUP_FAIL';
export const SAVE_GROUP_NAME_FAIL = 'logger-app/sharedActions/SAVE_GROUP_NAME_FAIL';
export const DELETE_GROUP_FAIL = 'logger-app/sharedActions/DELETE_GROUP_FAIL';
// App Management events
export const APP_MANAGMENT_SAVE_SUCCESS = 'logger-app/sharedActions/SAVE_SUCCESS';
export const APP_MANAGMENT_SAVE_FAIL = 'logger-app/sharedActions/SAVE_FAIL';

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

export function logDeleteEmitted(groupId, logId, logName, groupName) {
  return {
    type: LOG_DELETE_EMITTED,
    groupId,
    logId,
    logName,
    groupName
  };
}

export function tailErrorEmitted(logId, errorReason, errorCode) {
  return {
    type: TAIL_ERROR_EMITTED,
    logId,
    errorReason,
    errorCode
  };
}
