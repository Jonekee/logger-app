const LOAD = 'redux-example/groups/LOAD';
const LOAD_SUCCESS = 'redux-example/groups/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/groups/LOAD_FAIL';
const TOGGLE_NAV_GROUP_OPEN = 'redux-example/groups/TOGGLE_NAV_GROUP_OPEN';

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
        data: state.data.map(group =>
          group.name === action.groupName
            ? { ...group, navOpen: !group.navOpen }
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

export function toggleNavGroupOpen(groupName) {
  return {
    type: TOGGLE_NAV_GROUP_OPEN,
    groupName
  };
}
