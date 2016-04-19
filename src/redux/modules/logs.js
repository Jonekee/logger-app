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
const SET_TAIL_ERROR = 'logger-app/logs/SET_TAIL_ERROR';

// Log Management actions
// Edit Group Name
const TOGGLE_EDIT_OPEN = 'logger-app/logs/TOGGLE_EDIT_OPEN';
const SET_EDITED_NAME = 'logger-app/logs/SET_EDITED_NAME';
const SET_EDITED_GROUP = 'logger-app/logs/SET_EDITED_GROUP';
const SET_EDITED_FILE = 'logger-app/logs/SET_EDITED_FILE';
const SET_EDITED_PATH = 'logger-app/logs/SET_EDITED_PATH';
const SAVE_LOG_CHANGES = 'logger-app/logs/SAVE_LOG_CHANGES';
const SAVE_LOG_CHANGES_SUCCESS = 'logger-app/logs/SAVE_LOG_CHANGES_SUCCESS';
const SAVE_LOG_CHANGES_FAIL = 'logger-app/logs/SAVE_LOG_CHANGES_FAIL';

// Delete Group
const TOGGLE_DELETE_LOG_OPEN = 'logger-app/logs/TOGGLE_DELETE_LOG_OPEN';
const DELETE_LOG = 'logger-app/logs/DELETE_LOG';
const DELETE_LOG_SUCCESS = 'logger-app/logs/DELETE_LOG_SUCCESS';
const DELETE_LOG_FAIL = 'logger-app/logs/DELETE_LOG_FAIL';

// Socket Events
import { GROUP_DELETE_EMITTED, NEW_LOG_EMITTED, LOG_DELETE_EMITTED } from './sharedActions.js';

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
  logLevelMapping: null,
  tailError: null,
  // Log Management Page Variables
  editPanelOpen: false,
  editedName: log.name,
  editedGroup: null,
  editedFile: log.fname,
  editedPath: log.fpath,
  editSaving: false,
  deletePanelOpen: false,
  deleteSaving: false
});

const logReducer = (state, action) => {
  switch (action.type) {
    case ACTIVATE_LOG:
      return {
        ...state,
        activeState: 'ACTIVE',
        tailError: null
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
    case SET_TAIL_ERROR:
      return {
        ...state,
        activeState: 'INACTIVE',
        tailError: action.tailError
      };
    case TOGGLE_EDIT_OPEN:
      return {
        ...state,
        editPanelOpen: !state.editPanelOpen
      };
    case SET_EDITED_NAME:
      return {
        ...state,
        editedName: action.editedName
      };
    case SET_EDITED_GROUP:
      return {
        ...state,
        editedGroup: action.editedGroup
      };
    case SET_EDITED_FILE:
      return {
        ...state,
        editedFile: action.editedFile
      };
    case SET_EDITED_PATH:
      return {
        ...state,
        editedPath: action.editedPath
      };
    case TOGGLE_DELETE_LOG_OPEN:
      return {
        ...state,
        deletePanelOpen: !state.deletePanelOpen
      };
    case DELETE_LOG:
      return {
        ...state,
        deleteSaving: true
      };
    case DELETE_LOG_FAIL:
      return {
        ...state,
        deleteSaving: false
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
    case NEW_LOG_EMITTED:
      return {
        ...state,
        data: {
          ...state.data,
          [action.newLogId]: applyDefaultLogValues({
            name: action.logName,
            fname: action.logFile,
            fpath: action.logPath
          })
        }
      };
    case LOG_DELETE_EMITTED:
      const {[action.logId]: omit, ...others} = state.data;
      return {
        ...state,
        data: others
      };
    case GROUP_DELETE_EMITTED:
      let { ...savedLogs } = state.data;
      action.logIds.forEach(logId => {
        const {[logId]: omitLog, ...nextSavedLogs} = savedLogs;
        savedLogs = nextSavedLogs;
      });
      return {
        ...state,
        data: savedLogs
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
    case SET_TAIL_ERROR:
    case TOGGLE_EDIT_OPEN:
    case SET_EDITED_NAME:
    case SET_EDITED_GROUP:
    case SET_EDITED_FILE:
    case SET_EDITED_PATH:
    case TOGGLE_DELETE_LOG_OPEN:
    case DELETE_LOG:
    case DELETE_LOG_FAIL:
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

export function setTailError(logId, tailError) {
  return {
    type: SET_TAIL_ERROR,
    logId,
    tailError
  };
}

export function toggleEditOpen(logId) {
  return {
    type: TOGGLE_EDIT_OPEN,
    logId
  };
}

export function setEditedName(logId, editedName) {
  return {
    type: SET_EDITED_NAME,
    logId,
    editedName
  };
}

export function setEditedGroup(logId, editedGroup) {
  return {
    type: SET_EDITED_GROUP,
    logId,
    editedGroup
  };
}

export function setEditedPath(logId, editedPath) {
  return {
    type: SET_EDITED_PATH,
    logId,
    editedPath
  };
}

export function setEditedFile(logId, editedFile) {
  return {
    type: SET_EDITED_FILE,
    logId,
    editedFile
  };
}

export function saveLogChanges(logId, editedName, editedGroup, editedFile, editedPath) {
  return {
    types: [SAVE_LOG_CHANGES, SAVE_LOG_CHANGES_SUCCESS, SAVE_LOG_CHANGES_FAIL],
    promise: (client) => client.post('/system/saveLogChanges', {
      data: {
        logId,
        editedName,
        editedGroup,
        editedFile,
        editedPath
      }
    }),
    logId
  };
}

export function toggleDeleteLogOpen(logId) {
  return {
    type: TOGGLE_DELETE_LOG_OPEN,
    logId
  };
}

export function deleteLog(groupId, logId) {
  return {
    types: [DELETE_LOG, DELETE_LOG_SUCCESS, DELETE_LOG_FAIL],
    promise: (client) => client.post('/system/deleteLog', {
      data: {
        groupId,
        logId
      }
    }),
    logId
  };
}
