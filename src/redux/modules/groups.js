const LOAD = 'redux-example/groups/LOAD';
const LOAD_SUCCESS = 'redux-example/groups/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/groups/LOAD_FAIL';
const TOGGLE_NAV_GROUP_OPEN = 'redux-example/groups/TOGGLE_NAV_GROUP_OPEN';
const TOGGLE_LOG_EXTRA_ACTIONS_OPEN = 'redux-example/groups/TOGGLE_LOG_EXTRA_ACTIONS_OPEN';

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
    case TOGGLE_NAV_GROUP_OPEN:
      return {
        ...state,
        data: state.data.map((group, index) =>
          index === parseInt(action.groupId, 10)
            ? { ...group, navOpen: !group.navOpen }
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

export function toggleNavGroupOpen(groupId) {
  return {
    type: TOGGLE_NAV_GROUP_OPEN,
    groupId
  };
}

export function toggleLogExtraActionsOpen(groupId, logId) {
  return {
    type: TOGGLE_LOG_EXTRA_ACTIONS_OPEN,
    groupId,
    logId
  };
}
