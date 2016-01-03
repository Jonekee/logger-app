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
