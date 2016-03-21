const INITIAL_LOAD = 'redux-example/logz/INITIAL_LOAD';
const INITIAL_LOAD_SUCCESS = 'redux-example/logz/INITIAL_LOAD_SUCCESS';
const INITIAL_LOAD_FAIL = 'redux-example/logz/INITIAL_LOAD_FAIL';

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
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.logz && globalState.logz.loaded;
}

export function load() {
  return {
    types: [ INITIAL_LOAD, INITIAL_LOAD_SUCCESS, INITIAL_LOAD_FAIL ],
    promise: (client) => client.get('/system/getLogz')
  };
}
