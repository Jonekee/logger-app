const LOAD = 'redux-example/groups/LOAD';
const LOAD_SUCCESS = 'redux-example/groups/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/groups/LOAD_FAIL';
const SET_DASHBOARD_LIST_FILTER = 'redux-example/groups/SET_DASHBOARD_LIST_FILTER';
const TOGGLE_NAV_GROUP_OPEN = 'redux-example/groups/TOGGLE_NAV_GROUP_OPEN';
const TOGGLE_ACTIVE_NAV_GROUP_OPEN = 'redux-example/groups/TOGGLE_ACTIVE_NAV_GROUP_OPEN';
const SET_ACTIVE_GROUP_LIST_FILTER = 'redux-example/groups/SET_ACTIVE_GROUP_LIST_FILTER';
const SET_GROUP_LIST_FILTER = 'redux-example/groups/SET_GROUP_LIST_FILTER';
const TOGGLE_LOG_EXTRA_ACTIONS_OPEN = 'redux-example/groups/TOGGLE_LOG_EXTRA_ACTIONS_OPEN';
const ACTIVATE_LOG = 'redux-example/groups/ACTIVATE_LOG';
const PAUSE_LOG = 'redux-example/groups/PAUSE_LOG';
const RESUME_LOG = 'redux-example/groups/RESUME_LOG';
const DEACTIVATE_LOG = 'redux-example/groups/DEACTIVATE_LOG';
const ADD_LINE_TO_LOG = 'redux-example/groups/ADD_LINE_TO_LOG';
const SET_LOG_READ = 'redux-example/groups/SET_LOG_READ';
const CLEAR_LOG_OUTPUT = 'redux-example/groups/CLEAR_LOG_OUTPUT';
const TOGGLE_SCROLL_LOCK = 'redux-example/groups/TOGGLE_SCROLL_LOCK';
const TOGGLE_EDIT_GROUP_NAME = 'redux-example/groups/TOGGLE_EDIT_GROUP_NAME';
const TOGGLE_DELETE_GROUP = 'redux-example/groups/TOGGLE_DELETE_GROUP';
const UPDATE_UNSAVED_GROUP_NAME = 'redux-example/groups/UPDATE_UNSAVED_GROUP_NAME';
const SAVE_GROUP_NAME = 'redux-example/groups/SAVE_GROUP_NAME';
const SAVE_GROUP_NAME_SUCCESS = 'redux-example/groups/SAVE_GROUP_NAME_SUCCESS';
const SAVE_GROUP_NAME_FAIL = 'redux-example/groups/SAVE_GROUP_NAME_FAIL';
const DELETE_GROUP = 'redux-example/groups/DELETE_GROUP';
const DELETE_GROUP_SUCCESS = 'redux-example/groups/DELETE_GROUP_SUCCESS';
const DELETE_GROUP_FAIL = 'redux-example/groups/DELETE_GROUP_FAIL';

const NEW_GROUP_EMITTED = 'redux-example/groups/NEW_GROUP_EMITTED';
const GROUP_NAME_CHANGE_EMITTED = 'redux-example/groups/GROUP_NAME_CHANGE_EMITTED';
const GROUP_DELETE_EMITTED = 'redux-example/groups/GROUP_DELETE_EMITTED';

const initialState = {
  loaded: false,
  activeGroupOpen: true,
  activeGroupListFilter: '',
  dashboardListFilter: ''
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
        data: action.result,
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
    case SET_DASHBOARD_LIST_FILTER:
      return {
        ...state,
        dashboardListFilter: action.newListFilter
      };
    case TOGGLE_NAV_GROUP_OPEN:
      return {
        ...state,
        data: state.data.map((group, index) =>
          index === parseInt(action.groupId, 10)
            ? { ...group, navOpen: !group.navOpen }
            : group
        )
      };
    case TOGGLE_ACTIVE_NAV_GROUP_OPEN:
      return {
        ...state,
        activeGroupOpen: !state.activeGroupOpen
      };
    case SET_ACTIVE_GROUP_LIST_FILTER:
      return {
        ...state,
        activeGroupListFilter: action.newListFilter
      };
    case SET_GROUP_LIST_FILTER:
      return {
        ...state,
        data: state.data.map((group, index) =>
          index === parseInt(action.groupId, 10)
            ? {
              ...group,
              listFilter: action.newListFilter
            }
            : group
        )
      };
    case TOGGLE_LOG_EXTRA_ACTIONS_OPEN:
      return {
        ...state,
        data: state.data.map((group, groupId) =>
          groupId === parseInt(action.groupId, 10)
            ? {
              ...group,
              logs: group.logs.map((log, logId) =>
                logId === parseInt(action.logId, 10)
                  ? {
                    ...log,
                    extraActionsOpen: !log.extraActionsOpen
                  }
                  : log
              )
            }
            : group
        )
      };
    case ACTIVATE_LOG:
      return {
        ...state,
        data: state.data.map((group, groupId) =>
          groupId === parseInt(action.groupId, 10)
            ? {
              ...group,
              logs: group.logs.map((log, logId) =>
                logId === parseInt(action.logId, 10)
                  ? {
                    ...log,
                    activeState: 'ACTIVE'
                  }
                  : log
              )
            }
            : group
        )
      };
    case PAUSE_LOG:
      return {
        ...state,
        data: state.data.map((group, groupId) =>
          groupId === parseInt(action.groupId, 10)
            ? {
              ...group,
              logs: group.logs.map((log, logId) =>
                logId === parseInt(action.logId, 10)
                  ? {
                    ...log,
                    activeState: 'PAUSED'
                  }
                  : log
              )
            }
            : group
        )
      };
    case RESUME_LOG:
      return {
        ...state,
        data: state.data.map((group, groupId) =>
          groupId === parseInt(action.groupId, 10)
            ? {
              ...group,
              logs: group.logs.map((log, logId) =>
                logId === parseInt(action.logId, 10)
                  ? {
                    ...log,
                    activeState: 'ACTIVE',
                    logData: log.logData.concat(log.pausedLogData),
                    pausedLogData: []
                  }
                  : log
              )
            }
            : group
        )
      };
    case DEACTIVATE_LOG:
      return {
        ...state,
        data: state.data.map((group, groupId) =>
          groupId === parseInt(action.groupId, 10)
            ? {
              ...group,
              logs: group.logs.map((log, logId) =>
                logId === parseInt(action.logId, 10)
                  ? {
                    ...log,
                    activeState: log.logData.length ? 'INACTIVE_WITH_OUTPUT' : 'INACTIVE',
                    pausedLogData: []
                  }
                  : log
              )
            }
            : group
        )
      };
    case ADD_LINE_TO_LOG:
      return {
        ...state,
        data: state.data.map((group, groupId) =>
          groupId === parseInt(action.groupId, 10)
            ? {
              ...group,
              logs: group.logs.map((log, logId) =>
                logId === parseInt(action.logId, 10)
                  ? {
                    ...log,
                    logData: log.activeState === 'PAUSED' ? log.logData : log.logData.concat(action.newLine),
                    pausedLogData: log.activeState === 'PAUSED' ? log.pausedLogData.concat(action.newLine) : log.pausedLogData,
                    hasNew: true
                  }
                  : log
              )
            }
            : group
        )
      };
    case SET_LOG_READ:
      return {
        ...state,
        data: state.data.map((group, groupId) =>
          groupId === parseInt(action.groupId, 10)
            ? {
              ...group,
              logs: group.logs.map((log, logId) =>
                logId === parseInt(action.logId, 10)
                  ? {
                    ...log,
                    hasNew: false
                  }
                  : log
              )
            }
            : group
        )
      };
    case CLEAR_LOG_OUTPUT:
      return {
        ...state,
        data: state.data.map((group, groupId) =>
          groupId === parseInt(action.groupId, 10)
            ? {
              ...group,
              logs: group.logs.map((log, logId) =>
                logId === parseInt(action.logId, 10)
                  ? {
                    ...log,
                    activeState: 'INACTIVE',
                    logData: [],
                    pausedLogData: []
                  }
                  : log
              )
            }
            : group
        )
      };
    case TOGGLE_SCROLL_LOCK:
      return {
        ...state,
        data: state.data.map((group, groupId) =>
          groupId === parseInt(action.groupId, 10)
            ? {
              ...group,
              logs: group.logs.map((log, logId) =>
                logId === parseInt(action.logId, 10)
                  ? {
                    ...log,
                    scrollLocked: !log.scrollLocked
                  }
                  : log
              )
            }
            : group
        )
      };
    case TOGGLE_EDIT_GROUP_NAME:
      return {
        ...state,
        data: state.data.map((group, index) =>
          index === parseInt(action.groupId, 10)
            ? {
              ...group,
              adminPageEditing: !group.adminPageEditing
            }
            : group
        )
      };
    case TOGGLE_DELETE_GROUP:
      return {
        ...state,
        data: state.data.map((group, index) =>
          index === parseInt(action.groupId, 10)
            ? {
              ...group,
              adminPageDeleteChecking: !group.adminPageDeleteChecking
            }
            : group
        )
      };
    case UPDATE_UNSAVED_GROUP_NAME:
      return {
        ...state,
        data: state.data.map((group, index) =>
          index === parseInt(action.groupId, 10)
            ? {
              ...group,
              adminPageNewName: action.name,
              adminPageEditingError: false
            }
            : group
        )
      };
    case SAVE_GROUP_NAME:
      return {
        ...state,
        data: state.data.map((group, index) =>
          index === parseInt(action.groupId, 10)
            ? {
              ...group,
              adminPageSaving: true
            }
            : group
        )
      };
    case SAVE_GROUP_NAME_SUCCESS:
      return {
        ...state,
        data: state.data.map((group, index) =>
          index === parseInt(action.groupId, 10)
            ? {
              ...group,
              name: group.adminPageNewName,
              adminPageEditing: false,
              adminPageSaving: false
            }
            : group
        )
      };
    case SAVE_GROUP_NAME_FAIL:
      return {
        ...state,
        data: state.data.map((group, index) =>
          index === parseInt(action.groupId, 10)
            ? {
              ...group,
              adminPageSaving: false,
              adminPageEditingError: true
            }
            : group
        )
      };
    case DELETE_GROUP:
      return {
        ...state,
        data: state.data.map((group, index) =>
          index === parseInt(action.groupId, 10)
            ? {
              ...group,
              adminPageDeleting: true
            }
            : group
        )
      };
    case DELETE_GROUP_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data.slice(0, parseInt(action.groupId, 10)),
          ...state.data.slice(parseInt(action.groupId, 10) + 1)
        ]
      };
    case DELETE_GROUP_FAIL:
      return {
        ...state,
        data: state.data.map((group, index) =>
          index === parseInt(action.groupId, 10)
            ? {
              ...group,
              adminPageDeleteChecking: false,
              adminPageDeleting: false
            }
            : group
        )
      };
    case NEW_GROUP_EMITTED:
      return {
        ...state,
        data: [
          ...state.data,
          {
            name: action.name,
            logs: []
          }
        ]
      };
    case GROUP_NAME_CHANGE_EMITTED:
      return {
        ...state,
        data: [
          ...state.data.slice(0, parseInt(action.groupId, 10)),
          {
            ...state.data[parseInt(action.groupId, 10)],
            name: action.name
          },
          ...state.data.slice(parseInt(action.groupId, 10) + 1)
        ]
      };
    case GROUP_DELETE_EMITTED:
      return {
        ...state,
        data: [
          ...state.data.slice(0, parseInt(action.groupId, 10)),
          ...state.data.slice(parseInt(action.groupId, 10) + 1)
        ]
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.groups && globalState.groups.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/system/getGroups') // params not used, just shown as demonstration
  };
}

export function setDashboardListFilter(newListFilter) {
  return {
    type: SET_DASHBOARD_LIST_FILTER,
    newListFilter
  };
}

export function toggleNavGroupOpen(groupId) {
  return {
    type: TOGGLE_NAV_GROUP_OPEN,
    groupId
  };
}

export function toggleActiveNavGroupOpen() {
  return {
    type: TOGGLE_ACTIVE_NAV_GROUP_OPEN
  };
}

export function setActiveGroupListFilter(newListFilter) {
  return {
    type: SET_ACTIVE_GROUP_LIST_FILTER,
    newListFilter
  };
}

export function setGroupListFilter(groupId, newListFilter) {
  return {
    type: SET_GROUP_LIST_FILTER,
    groupId,
    newListFilter
  };
}

export function toggleLogExtraActionsOpen(groupId, logId) {
  return {
    type: TOGGLE_LOG_EXTRA_ACTIONS_OPEN,
    groupId,
    logId
  };
}

export function activateLog(groupId, logId) {
  return {
    type: ACTIVATE_LOG,
    groupId,
    logId
  };
}

export function pauseLog(groupId, logId) {
  return {
    type: PAUSE_LOG,
    groupId,
    logId
  };
}

export function resumeLog(groupId, logId) {
  return {
    type: RESUME_LOG,
    groupId,
    logId
  };
}

export function deactivateLog(groupId, logId) {
  return {
    type: DEACTIVATE_LOG,
    groupId,
    logId
  };
}

export function addLineToLog(groupId, logId, newLine) {
  return {
    type: ADD_LINE_TO_LOG,
    groupId,
    logId,
    newLine
  };
}

export function setLogRead(groupId, logId) {
  return {
    type: SET_LOG_READ,
    groupId,
    logId
  };
}

export function clearLogOutput(groupId, logId) {
  return {
    type: CLEAR_LOG_OUTPUT,
    groupId,
    logId
  };
}

export function toggleScrollLock(groupId, logId) {
  return {
    type: TOGGLE_SCROLL_LOCK,
    groupId,
    logId
  };
}

export function toggleEditGroupName(groupId) {
  return {
    type: TOGGLE_EDIT_GROUP_NAME,
    groupId
  };
}

export function toggleDeleteGroup(groupId) {
  return {
    type: TOGGLE_DELETE_GROUP,
    groupId
  };
}


export function updateUnsavedGroupName(groupId, name) {
  return {
    type: UPDATE_UNSAVED_GROUP_NAME,
    groupId,
    name
  };
}

export function saveGroupName(groupId, name) {
  return {
    types: [SAVE_GROUP_NAME, SAVE_GROUP_NAME_SUCCESS, SAVE_GROUP_NAME_FAIL],
    promise: (client) => client.post('/system/saveGroupName', {
      data: {
        groupId,
        name
      }
    }),
    groupId
  };
}

export function deleteGroup(groupId) {
  return {
    types: [DELETE_GROUP, DELETE_GROUP_SUCCESS, DELETE_GROUP_FAIL],
    promise: (client) => client.post('/system/deleteGroup', {
      data: {
        groupId
      }
    }),
    groupId
  };
}


export function newGroupEmitted(name) {
  return {
    type: NEW_GROUP_EMITTED,
    name
  };
}


export function groupNameChangeEmitted(groupId, name) {
  return {
    type: GROUP_NAME_CHANGE_EMITTED,
    groupId,
    name
  };
}


export function groupDeleteEmitted(groupId) {
  return {
    type: GROUP_DELETE_EMITTED,
    groupId
  };
}
