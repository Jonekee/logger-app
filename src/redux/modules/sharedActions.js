export const GROUP_DELETE_EMITTED = 'logger-app/sharedActions/GROUP_DELETE_EMITTED';
export const NEW_LOG_EMITTED = 'logger-app/sharedActions/NEW_LOG_EMITTED';
export const LOG_DELETE_EMITTED = 'logger-app/sharedActions/LOG_DELETE_EMITTED';


export function groupDeleteEmitted(groupId, logIds) {
  return {
    type: GROUP_DELETE_EMITTED,
    groupId,
    logIds
  };
}

export function newLogEmitted(newLogId, logName, groupId, logFile, logPath) {
  return {
    type: NEW_LOG_EMITTED,
    newLogId,
    logName,
    groupId,
    logFile,
    logPath
  };
}

export function logDeleteEmitted(groupId, logId) {
  return {
    type: LOG_DELETE_EMITTED,
    groupId,
    logId
  };
}
