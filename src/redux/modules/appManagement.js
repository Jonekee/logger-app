const LOAD = 'logger-app/appManagement/LOAD';
const LOAD_SUCCESS = 'logger-app/appManagement/LOAD_SUCCESS';
const LOAD_FAIL = 'logger-app/appManagement/LOAD_FAIL';
const EDIT_WEB_PORT = 'logger-app/appManagement/EDIT_WEB_PORT';
const EDIT_API_PORT = 'logger-app/appManagement/EDIT_API_PORT';
const EDIT_LOG_LEVEL = 'logger-app/appManagement/EDIT_LOG_LEVEL';
const RESET_CHANGES = 'logger-app/appManagement/RESET_CHANGES';
const APP_MANAGMENT_SAVE = 'logger-app/appManagement/SAVE';

import {
  APP_MANAGMENT_SAVE_SUCCESS,
  APP_MANAGMENT_SAVE_FAIL
} from './sharedActions.js';

const initialState = {
  loaded: false
};

export default function appManagement(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: {
          ...action.result,
          editableWebPort: action.result.webport,
          editableApiPort: action.result.apiport,
          editableLogLevel: action.result.loglevel
        },
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case EDIT_WEB_PORT:
      return {
        ...state,
        data: {
          ...state.data,
          editableWebPort: parseInt(action.newWebPort.replace(/[^0-9]/g, '').substring(0, 5), 10) || ''
        }
      };
    case EDIT_API_PORT:
      return {
        ...state,
        data: {
          ...state.data,
          editableApiPort: parseInt(action.newApiPort.replace(/[^0-9]/g, '').substring(0, 5), 10) || ''
        }
      };
    case EDIT_LOG_LEVEL:
      return {
        ...state,
        data: {
          ...state.data,
          editableLogLevel: action.newLogLevel
        }
      };
    case RESET_CHANGES:
      return {
        ...state,
        data: {
          ...state.data,
          editableWebPort: state.data.webport,
          editableApiPort: state.data.apiport,
          editableLogLevel: state.data.loglevel
        }
      };
    case APP_MANAGMENT_SAVE:
      return {
        ...state,
        saving: true
      };
    case APP_MANAGMENT_SAVE_FAIL:
      return {
        ...state,
        saving: false
      };
    case APP_MANAGMENT_SAVE_SUCCESS:
      return {
        ...state,
        saving: false,
        data: {
          ...state.data,
          webport: state.data.editableWebPort,
          apiport: state.data.editableApiPort,
          loglevel: state.data.editableLogLevel
        }
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.appManagement && globalState.appManagement.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/system/getAppSettings')
  };
}

export function editWebPort(newWebPort) {
  return {
    type: EDIT_WEB_PORT,
    newWebPort
  };
}

export function editApiPort(newApiPort) {
  return {
    type: EDIT_API_PORT,
    newApiPort
  };
}

export function editLogLevel(newLogLevel) {
  return {
    type: EDIT_LOG_LEVEL,
    newLogLevel
  };
}

export function resetChanges() {
  return {
    type: RESET_CHANGES
  };
}

export function saveChanges(newWebPort, newApiPort, newLogLevel) {
  return {
    types: [APP_MANAGMENT_SAVE, APP_MANAGMENT_SAVE_SUCCESS, APP_MANAGMENT_SAVE_FAIL],
    promise: (client) => client.post('/system/saveSystemSettings', {
      data: {
        newWebPort,
        newApiPort,
        newLogLevel
      }
    })
  };
}
