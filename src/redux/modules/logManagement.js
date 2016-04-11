const TOGGLE_SORT_BY_GROUP = 'logger-app/logManagement/TOGGLE_SORT_BY_GROUP';
const TOGGLE_INPUTING_NEW_LOG = 'logger-app/logManagement/TOGGLE_INPUTING_NEW_LOG';
const SET_NEW_LOG_NAME = 'logger-app/logManagement/SET_NEW_LOG_NAME';
const SET_NEW_LOG_GROUP = 'logger-app/logManagement/SET_NEW_LOG_GROUP';
const SET_NEW_LOG_FILE = 'logger-app/logManagement/SET_NEW_LOG_FILE';
const SET_NEW_LOG_PATH = 'logger-app/logManagement/SET_NEW_LOG_PATH';
const CREATE_NEW_LOG = 'logger-app/logManagement/CREATE_NEW_LOG';
const CREATE_NEW_LOG_FAIL = 'logger-app/logManagement/CREATE_NEW_LOG_FAIL';
const CREATE_NEW_LOG_SUCCESS = 'logger-app/logManagement/CREATE_NEW_LOG_SUCCESS';

const initialState = {
  sortByGroup: true,
  inputingNewLog: false,
  savingNewLog: false,
  errorSavingNewLog: false,
  newLogName: '',
  newLogGroup: '-1'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_SORT_BY_GROUP:
      return {
        ...state,
        sortByGroup: !state.sortByGroup
      };
    case TOGGLE_INPUTING_NEW_LOG:
      return {
        ...state,
        inputingNewLog: !state.inputingNewLog
      };
    case SET_NEW_LOG_NAME:
      return {
        ...state,
        newLogName: action.newLogName,
        errorSavingNewLog: false
      };
    case SET_NEW_LOG_GROUP:
      return {
        ...state,
        newLogGroup: action.newLogGroup
      };
    case SET_NEW_LOG_FILE:
      return {
        ...state,
        newLogFile: action.newLogFile
      };
    case SET_NEW_LOG_PATH:
      console.log('SET_NEW_LOG_PATH');
      return {
        ...state,
        newLogPath: action.newLogPath
      };
    case CREATE_NEW_LOG:
      return {
        ...state,
        savingNewLog: true
      };
    case CREATE_NEW_LOG_SUCCESS:
      return {
        ...state,
        inputingNewLog: false,
        savingNewLog: false,
        newLogName: ''
      };
    case CREATE_NEW_LOG_FAIL:
      return {
        ...state,
        savingNewLog: false,
        errorSavingNewLog: true
      };
    default:
      return state;
  }
}

export function toggleSortByGroup() {
  return {
    type: TOGGLE_SORT_BY_GROUP
  };
}

export function toggleInputingNewGroup() {
  return {
    type: TOGGLE_INPUTING_NEW_LOG
  };
}

export function setNewLogName(newLogName) {
  return {
    type: SET_NEW_LOG_NAME,
    newLogName
  };
}

export function setNewLogGroup(newLogGroup) {
  return {
    type: SET_NEW_LOG_GROUP,
    newLogGroup
  };
}

export function setNewLogFile(newLogFile) {
  return {
    type: SET_NEW_LOG_FILE,
    newLogFile
  };
}

export function setNewLogPath(newLogPath) {
  return {
    type: SET_NEW_LOG_PATH,
    newLogPath
  };
}

export function createNewLog(logName, groupId, logFile, logPath) {
  return {
    types: [ CREATE_NEW_LOG, CREATE_NEW_LOG_SUCCESS, CREATE_NEW_LOG_FAIL],
    promise: (client) => client.post('/system/createNewLog', {
      data: {
        logName,
        groupId,
        logFile,
        logPath
      }
    }),
  };
}
