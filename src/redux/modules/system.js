const LOAD = 'redux-example/system/LOAD';
const LOAD_SUCCESS = 'redux-example/system/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/system/LOAD_FAIL';
const EDIT_WEB_PORT = 'redux-example/system/EDIT_WEB_PORT';
const EDIT_API_PORT = 'redux-example/system/EDIT_API_PORT';
const EDIT_LOG_LEVEL = 'redux-example/system/EDIT_LOG_LEVEL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
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
          editableWebPort: action.newWebPort
        }
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.system && globalState.system.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/system/getSystemSettings')
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
