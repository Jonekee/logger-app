const TOGGLE_SORT_BY_GROUP = 'redux-example/logManagement/TOGGLE_SORT_BY_GROUP';
const SET_NEW_LOG_NAME = 'redux-example/logManagement/SET_NEW_LOG_NAME';
const TOGGLE_INPUTING_NEW_LOG = 'redux-example/logManagement/TOGGLE_INPUTING_NEW_LOG';
const CREATE_NEW_LOG = 'redux-example/logManagement/CREATE_NEW_LOG';
const CREATE_NEW_LOG_FAIL = 'redux-example/logManagement/CREATE_NEW_LOG_FAIL';
const CREATE_NEW_LOG_SUCCESS = 'redux-example/logManagement/CREATE_NEW_LOG_SUCCESS';

const initialState = {
  sortByGroup: true,
  inputingNewLog: false,
  savingNewLog: false,
  errorSavingNewLog: false,
  newLogName: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_SORT_BY_GROUP:
      return {
        ...state,
        sortByGroup: !state.sortByGroup
      };
    case SET_NEW_LOG_NAME:
      return {
        ...state,
        newLogName: action.newLogName,
        errorSavingNewLog: false
      };
    case TOGGLE_INPUTING_NEW_LOG:
      return {
        ...state,
        inputingNewLog: !state.inputingNewLog
      };
    case CREATE_NEW_LOG:
      return {
        ...state,
        savingNewLog: true
      };
    case CREATE_NEW_LOG_SUCCESS:
      return {
        ...state,
        inputingNewLog: false,
        savingNewLog: false,
        newLogName: ''
      };
    case CREATE_NEW_LOG_FAIL:
      return {
        ...state,
        savingNewLog: false,
        errorSavingNewLog: true
      };
    default:
      return state;
  }
}

export function toggleSortByGroup() {
  return {
    type: TOGGLE_SORT_BY_GROUP
  };
}

export function setNewGroupName(newLogName) {
  return {
    type: SET_NEW_LOG_NAME,
    newLogName
  };
}

export function toggleInputingNewGroup() {
  return {
    type: TOGGLE_INPUTING_NEW_LOG
  };
}

export function createNewGroup(newLogName, groupId) {
  return {
    types: [ CREATE_NEW_LOG, CREATE_NEW_LOG_SUCCESS, CREATE_NEW_LOG_FAIL],
    promise: (client) => client.post('/system/createNewLog', {
      data: {
        newLogName,
        groupId
      }
    }),
  };
}