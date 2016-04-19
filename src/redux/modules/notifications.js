import { NEW_GROUP_EMITTED, GROUP_NAME_CHANGE_EMITTED, GROUP_DELETE_EMITTED, NEW_LOG_EMITTED, LOG_DELETE_EMITTED } from './sharedActions.js';
const CLEAR_NOTIFICATION = 'logger-app/notifications/CLEAR_NOTIFICATION';

const initialState = [];

export default function notifications(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_NOTIFICATION:
      return [
        ...state.slice(0, action.position),
        ...state.slice(action.position + 1)
      ];
    case NEW_GROUP_EMITTED:
      return [
        ...state,
        {
          type: 'INFO',
          'message': `New group "${action.newGroupName}" has been created`
        }
      ];
    case GROUP_NAME_CHANGE_EMITTED:
      return [
        ...state,
        {
          type: 'INFO',
          'message': `Group "${action.oldName}" has been renamed "${action.newName}"`
        }
      ];
    case GROUP_DELETE_EMITTED:
      return [
        ...state,
        {
          type: 'INFO',
          'message': `Group "${action.groupName}" has been deleted`
        }
      ];
    case NEW_LOG_EMITTED:
      return [
        ...state,
        {
          type: 'INFO',
          'message': `New log "${action.logName}" created in group "${action.groupName}"`
        }
      ];
    case LOG_DELETE_EMITTED:
      return [
        ...state,
        {
          type: 'INFO',
          'message': `Log "${action.logName}" has been deleted from group "${action.groupName}"`
        }
      ];
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
