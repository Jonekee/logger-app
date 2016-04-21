import {
  // Socket events
  NEW_GROUP_EMITTED,
  GROUP_NAME_CHANGE_EMITTED,
  GROUP_DELETE_EMITTED,
  NEW_LOG_EMITTED,
  LOG_DELETE_EMITTED,
  TAIL_ERROR_EMITTED,
  // API fails
  CREATE_NEW_GROUP_FAIL,
  SAVE_GROUP_NAME_FAIL,
  DELETE_GROUP_FAIL,
  // App Management
  APP_MANAGMENT_SAVE_SUCCESS,
  APP_MANAGMENT_SAVE_FAIL
} from './sharedActions.js';

const CLEAR_NOTIFICATION = 'logger-app/notifications/CLEAR_NOTIFICATION';

const initialState = {
  nextId: 0,
  list: []
};

export default function notifications(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        list: [
          ...state.list.slice(0, action.position),
          ...state.list.slice(action.position + 1)
        ]
      };
    case NEW_GROUP_EMITTED:
      return {
        nextId: state.nextId + 1,
        list: [
          ...state.list,
          {
            id: state.nextId,
            type: 'INFO',
            'message': `New group "${action.newGroupName}" has been created`
          }
        ]
      };
    case GROUP_NAME_CHANGE_EMITTED:
      return {
        nextId: state.nextId + 1,
        list: [
          ...state.list,
          {
            id: state.nextId,
            type: 'INFO',
            'message': `Group "${action.oldName}" has been renamed "${action.newName}"`
          }
        ]
      };
    case GROUP_DELETE_EMITTED:
      return {
        nextId: state.nextId + 1,
        list: [
          ...state.list,
          {
            id: state.nextId,
            type: 'INFO',
            'message': `Group "${action.groupName}" has been deleted`
          }
        ]
      };
    case NEW_LOG_EMITTED:
      return {
        nextId: state.nextId + 1,
        list: [
          ...state.list,
          {
            id: state.nextId,
            type: 'INFO',
            'message': `New log "${action.logName}" created in group "${action.groupName}"`
          }
        ]
      };
    case LOG_DELETE_EMITTED:
      return {
        nextId: state.nextId + 1,
        list: [
          ...state.list,
          {
            id: state.nextId,
            type: 'INFO',
            'message': `Log "${action.logName}" has been deleted from group "${action.groupName}"`
          }
        ]
      };
    case TAIL_ERROR_EMITTED:
      return {
        nextId: state.nextId + 1,
        list: [
          ...state.list,
          {
            id: state.nextId,
            type: 'ERROR',
            'message': `${action.errorReason} (${action.errorCode})`
          }
        ]
      };
    case CREATE_NEW_GROUP_FAIL:
      return {
        nextId: state.nextId + 1,
        list: [
          ...state.list,
          {
            id: state.nextId,
            type: 'ERROR',
            'message': `Failed to create new group "${action.newGroupName}". ${action.error.errorReason}`
          }
        ]
      };
    case SAVE_GROUP_NAME_FAIL:
      return {
        nextId: state.nextId + 1,
        list: [
          ...state.list,
          {
            id: state.nextId,
            type: 'ERROR',
            'message': `Failed to save new group name "${action.newGroupName}" for group "${action.groupName}". ${action.error.errorReason}`
          }
        ]
      };
    case DELETE_GROUP_FAIL:
      return {
        nextId: state.nextId + 1,
        list: [
          ...state.list,
          {
            id: state.nextId,
            type: 'ERROR',
            'message': `Failed to delete group "${action.groupName}". ${action.error.errorReason}`
          }
        ]
      };
    case APP_MANAGMENT_SAVE_SUCCESS:
      return {
        nextId: state.nextId + 1,
        list: [
          ...state.list,
          {
            id: state.nextId,
            type: 'ERROR',
            'message': 'App settings changes saved successfully. Restart the app for any port changes to take effect.'
          }
        ]
      };
    case APP_MANAGMENT_SAVE_FAIL:
      return {
        nextId: state.nextId + 1,
        list: [
          ...state.list,
          {
            id: state.nextId,
            type: 'ERROR',
            'message': `Failed to save app settings changes. ${action.error.errorReason}`
          }
        ]
      };
    default:
      return state;
  }
}

export function clearNotification(position) {
  return {
    type: CLEAR_NOTIFICATION,
    position
  };
}
