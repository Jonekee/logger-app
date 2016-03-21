const INITIAL_LOAD = 'redux-example/groups/INITIAL_LOAD';
const INITIAL_LOAD_SUCCESS = 'redux-example/groups/INITIAL_LOAD_SUCCESS';
const INITIAL_LOAD_FAIL = 'redux-example/groups/INITIAL_LOAD_FAIL';

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

export default function reducer(state = initialState, action = {}) {
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
