const INITIAL_LOAD = 'logger-app/logs/INITIAL_LOAD';
const INITIAL_LOAD_SUCCESS = 'logger-app/logs/INITIAL_LOAD_SUCCESS';
const INITIAL_LOAD_FAIL = 'logger-app/logs/INITIAL_LOAD_FAIL';

const ACTIVATE_LOG = 'logger-app/logs/ACTIVATE_LOG';
const PAUSE_LOG = 'logger-app/logs/PAUSE_LOG';
const RESUME_LOG = 'logger-app/logs/RESUME_LOG';
const DEACTIVATE_LOG = 'logger-app/logs/DEACTIVATE_LOG';
const CLEAR_LOG_OUTPUT = 'logger-app/logs/CLEAR_LOG_OUTPUT';
const TOGGLE_SCROLL_LOCK = 'logger-app/logs/TOGGLE_SCROLL_LOCK';
const TOGGLE_LOG_EXTRA_ACTIONS_OPEN = 'logger-app/logs/TOGGLE_LOG_EXTRA_ACTIONS_OPEN';

const ADD_LINE_TO_LOG = 'logger-app/logs/ADD_LINE_TO_LOG';
const SET_LOG_READ = 'logger-app/logs/SET_LOG_READ';

const initialState = {
  loaded: false
};

const applyDefaultLogValues = (log) => ({
  ...log,
  logData: [],
  pausedLogData: [],
  extraActionsOpen: false,
  activeState: 'INACTIVE',
  hasNew: false,
  scrollLocked: true,
  logLevelMapping: null
});

const logReducer = (state, action) => {
  switch (action.type) {
    case ACTIVATE_LOG:
      return {
        ...state,
        activeState: 'ACTIVE'
      };
    case PAUSE_LOG:
      return {
        ...state,
        activeState: 'PAUSED'
      };
    case RESUME_LOG:
      return {
        ...state,
        activeState: 'ACTIVE',
        logData: state.logData.concat(state.pausedLogData),
        pausedLogData: []
      };
    case DEACTIVATE_LOG:
      return {
        ...state,
        activeState: state.logData.length ? 'INACTIVE_WITH_OUTPUT' : 'INACTIVE',
        pausedLogData: []
      };
    case CLEAR_LOG_OUTPUT:
      return {
        ...state,
        activeState: 'INACTIVE',
        logData: [],
        pausedLogData: []
      };
    case TOGGLE_SCROLL_LOCK:
      return {
        ...state,
        scrollLocked: !state.scrollLocked
      };
    case TOGGLE_LOG_EXTRA_ACTIONS_OPEN:
      return {
        ...state,
        extraActionsOpen: !state.extraActionsOpen
      };
    case ADD_LINE_TO_LOG:
      return {
        ...state,
        logData: state.activeState === 'PAUSED' ? state.logData : state.logData.concat(action.newLine),
        pausedLogData: state.activeState === 'PAUSED' ? state.pausedLogData.concat(action.newLine) : state.pausedLogData,
        hasNew: true
      };
    case SET_LOG_READ:
      return {
        ...state,
        hasNew: false
      };
    default:
      return state;
  }
};

export default function logs(state = initialState, action = {}) {
  switch (action.type) {
    case INITIAL_LOAD:
      return {
        ...state,
        loading: true
      };
    case INITIAL_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: Object.keys(action.result).reduce((prev, logId) => ({
          ...prev,
          [logId]: applyDefaultLogValues(action.result[logId])
        }), {}),
        error: null
      };
    case INITIAL_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case ACTIVATE_LOG:
    case PAUSE_LOG:
    case RESUME_LOG:
    case DEACTIVATE_LOG:
    case CLEAR_LOG_OUTPUT:
    case TOGGLE_SCROLL_LOCK:
    case TOGGLE_LOG_EXTRA_ACTIONS_OPEN:
    case ADD_LINE_TO_LOG:
    case SET_LOG_READ:
      return {
        ...state,
        data: {
          ...state.data,
          [action.logId]: logReducer(state.data[action.logId], action)
        }
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.logs && globalState.logs.loaded;
}

export function load() {
  return {
    types: [ INITIAL_LOAD, INITIAL_LOAD_SUCCESS, INITIAL_LOAD_FAIL ],
    promise: (client) => client.get('/system/getLogs')
  };
}

export function activateLog(logId) {
  return {
    type: ACTIVATE_LOG,
    logId
  };
}

export function pauseLog(logId) {
  return {
    type: PAUSE_LOG,
    logId
  };
}

export function resumeLog(logId) {
  return {
    type: RESUME_LOG,
    logId
  };
}

export function deactivateLog(logId) {
  return {
    type: DEACTIVATE_LOG,
    logId
  };
}

export function clearLogOutput(logId) {
  return {
    type: CLEAR_LOG_OUTPUT,
    logId
  };
}

export function toggleScrollLock(logId) {
  return {
    type: TOGGLE_SCROLL_LOCK,
    logId
  };
}

export function toggleLogExtraActionsOpen(logId) {
  return {
    type: TOGGLE_LOG_EXTRA_ACTIONS_OPEN,
    logId
  };
}

export function addLineToLog(logId, newLine) {
  return {
    type: ADD_LINE_TO_LOG,
    logId,
    newLine
  };
}

export function setLogRead(logId) {
  return {
    type: SET_LOG_READ,
    logId
  };
}
