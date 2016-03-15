const SET_NEW_GROUP_NAME = 'redux-example/groupManagement/SET_NEW_GROUP_NAME';
const TOGGLE_INPUTING_NEW_GROUP = 'redux-example/groupManagement/TOGGLE_INPUTING_NEW_GROUP';
const CREATE_NEW_GROUP = 'redux-example/groupManagement/CREATE_NEW_GROUP';
const CREATE_NEW_GROUP_FAIL = 'redux-example/groupManagement/CREATE_NEW_GROUP_FAIL';
const CREATE_NEW_GROUP_SUCCESS = 'redux-example/groupManagement/CREATE_NEW_GROUP_SUCCESS';

const initialState = {
  inputingNewGroup: false,
  savingNewGroup: false,
  errorSavingNewGroup: false,
  newGroupName: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_NEW_GROUP_NAME:
      return {
        ...state,
        newGroupName: action.newGroupName,
        errorSavingNewGroup: false
      };
    case TOGGLE_INPUTING_NEW_GROUP:
      return {
        ...state,
        inputingNewGroup: !state.inputingNewGroup
      };
    case CREATE_NEW_GROUP:
      return {
        ...state,
        savingNewGroup: true
      };
    case CREATE_NEW_GROUP_SUCCESS:
      return {
        ...state,
        inputingNewGroup: false,
        savingNewGroup: false,
        newGroupName: ''
      };
    case CREATE_NEW_GROUP_FAIL:
      return {
        ...state,
        savingNewGroup: false,
        errorSavingNewGroup: true
      };
    default:
      return state;
  }
}

export function setNewGroupName(newGroupName) {
  return {
    type: SET_NEW_GROUP_NAME,
    newGroupName
  };
}

export function toggleInputingNewGroup() {
  return {
    type: TOGGLE_INPUTING_NEW_GROUP
  };
}

export function createNewGroup(newGroupName) {
  return {
    types: [ CREATE_NEW_GROUP, CREATE_NEW_GROUP_SUCCESS, CREATE_NEW_GROUP_FAIL],
    promise: (client) => client.post('/system/createNewGroup', {
      data: {
        newGroupName
      }
    }),
  };
}
