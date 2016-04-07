const INITIAL_LOAD = 'logger-app/groupz/INITIAL_LOAD';
const INITIAL_LOAD_SUCCESS = 'logger-app/groupz/INITIAL_LOAD_SUCCESS';
const INITIAL_LOAD_FAIL = 'logger-app/groupz/INITIAL_LOAD_FAIL';

const TOGGLE_NAV_GROUP_OPEN = 'logger-app/groupz/TOGGLE_NAV_GROUP_OPEN';
const SET_GROUP_LIST_FILTER = 'logger-app/groupz/SET_GROUP_LIST_FILTER';

const initialState = {
  loaded: false
};

const applyDefaultGroupValues = (group) => ({
  ...group,
  navOpen: true,
  listFilter: '',
  adminPageEditing: false,
  adminPageEditingError: false,
  adminPageDeleteChecking: false,
  adminPageDeleting: false,
  adminPageSaving: false,
  adminPageNewName: group.name
});

const groupReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_NAV_GROUP_OPEN:
      return {
        ...state,
        navOpen: !state.navOpen
      };
    case SET_GROUP_LIST_FILTER:
      return {
        ...state,
        listFilter: action.newListFilter
      };
    default:
      return state;
  }
};

export default function groupz(state = initialState, action = {}) {
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
        data: Object.keys(action.result).reduce((prev, groupId) => ({
          ...prev,
          [groupId]: applyDefaultGroupValues(action.result[groupId])
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
    case TOGGLE_NAV_GROUP_OPEN:
    case SET_GROUP_LIST_FILTER:
      return {
        ...state,
        data: {
          ...state.data,
          [action.groupId]: groupReducer(state.data[action.groupId], action)
        }
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.groupz && globalState.groupz.loaded;
}

export function load() {
  return {
    types: [ INITIAL_LOAD, INITIAL_LOAD_SUCCESS, INITIAL_LOAD_FAIL ],
    promise: (client) => client.get('/system/getGroupz')
  };
}

export function toggleNavGroupOpen(groupId) {
  return {
    type: TOGGLE_NAV_GROUP_OPEN,
    groupId
  };
}

export function setGroupListFilter(groupId, newListFilter) {
  return {
    type: SET_GROUP_LIST_FILTER,
    groupId,
    newListFilter
  };
}
