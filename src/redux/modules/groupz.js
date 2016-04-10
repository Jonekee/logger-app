const INITIAL_LOAD = 'logger-app/groupz/INITIAL_LOAD';
const INITIAL_LOAD_SUCCESS = 'logger-app/groupz/INITIAL_LOAD_SUCCESS';
const INITIAL_LOAD_FAIL = 'logger-app/groupz/INITIAL_LOAD_FAIL';

const TOGGLE_NAV_GROUP_OPEN = 'logger-app/groupz/TOGGLE_NAV_GROUP_OPEN';
const SET_GROUP_LIST_FILTER = 'logger-app/groupz/SET_GROUP_LIST_FILTER';

// Group Management actions
// Edit Group Name
const TOGGLE_EDIT_NAME_OPEN = 'logger-app/groupz/TOGGLE_EDIT_NAME_OPEN';
const SET_EDITED_NAME = 'logger-app/groupz/SET_EDITED_NAME';
const SAVE_GROUP_NAME = 'logger-app/groupz/SAVE_GROUP_NAME';
const SAVE_GROUP_NAME_SUCCESS = 'logger-app/groupz/SAVE_GROUP_NAME_SUCCESS';
const SAVE_GROUP_NAME_FAIL = 'logger-app/groupz/SAVE_GROUP_NAME_FAIL';
// Delete Group
const TOGGLE_DELETE_GROUP_OPEN = 'logger-app/groupz/TOGGLE_DELETE_GROUP_OPEN';
const DELETE_GROUP = 'logger-app/groupz/DELETE_GROUP';
const DELETE_GROUP_SUCCESS = 'logger-app/groupz/DELETE_GROUP_SUCCESS';
const DELETE_GROUP_FAIL = 'logger-app/groupz/DELETE_GROUP_FAIL';

// Socket Events
const NEW_GROUP_EMITTED = 'logger-app/groupz/NEW_GROUP_EMITTED';
const GROUP_NAME_CHANGE_EMITTED = 'logger-app/groupz/GROUP_NAME_CHANGE_EMITTED';
const GROUP_DELETE_EMITTED = 'logger-app/groupz/GROUP_DELETE_EMITTED';


const initialState = {
  loaded: false
};

const applyDefaultGroupValues = (group) => ({
  ...group,
  navOpen: true,
  listFilter: '',
  editNameOpen: false,
  editedName: group.name,
  editSaving: false,
  editedNameHasError: false,
  deleteGroupOpen: false,
  deleteSaving: false
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
    case TOGGLE_EDIT_NAME_OPEN:
      return {
        ...state,
        editNameOpen: !state.editNameOpen
      };
    case SET_EDITED_NAME:
      return {
        ...state,
        editedName: action.name,
        editedNameHasError: false
      };
    case SAVE_GROUP_NAME:
      return {
        ...state,
        editSaving: true
      };
    case SAVE_GROUP_NAME_SUCCESS:
      return {
        ...state,
        name: state.editedName,
        editNameOpen: false,
        editSaving: false
      };
    case SAVE_GROUP_NAME_FAIL:
      return {
        ...state,
        editSaving: false,
        editedNameHasError: true
      };
    case TOGGLE_DELETE_GROUP_OPEN:
      return {
        ...state,
        deleteGroupOpen: !state.deleteGroupOpen
      };
    case DELETE_GROUP:
      return {
        ...state,
        deleteSaving: true
      };
    case DELETE_GROUP_FAIL:
      return {
        ...state,
        deleteGroupOpen: false,
        deleteSaving: false
      };
    case GROUP_NAME_CHANGE_EMITTED:
      return {
        ...state,
        name: action.newName
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
    case DELETE_GROUP_SUCCESS:
    case GROUP_DELETE_EMITTED:
      const {[action.groupId]: omit, ...others} = state.data;
      return {
        ...state,
        data: others
      };
    case NEW_GROUP_EMITTED:
      return {
        ...state,
        data: {
          ...state.data,
          [action.newGroupId]: applyDefaultGroupValues({ name: action.newGroupName, logs: [] })
        }
      };
    case TOGGLE_NAV_GROUP_OPEN:
    case SET_GROUP_LIST_FILTER:
    case TOGGLE_EDIT_NAME_OPEN:
    case SET_EDITED_NAME:
    case SAVE_GROUP_NAME:
    case SAVE_GROUP_NAME_SUCCESS:
    case SAVE_GROUP_NAME_FAIL:
    case TOGGLE_DELETE_GROUP_OPEN:
    case DELETE_GROUP:
    case DELETE_GROUP_FAIL:
    case GROUP_NAME_CHANGE_EMITTED:
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

export function toggleEditNameOpen(groupId) {
  return {
    type: TOGGLE_EDIT_NAME_OPEN,
    groupId
  };
}

export function setEditedName(groupId, name) {
  return {
    type: SET_EDITED_NAME,
    groupId,
    name
  };
}

export function saveGroupName(groupId, name) {
  return {
    types: [SAVE_GROUP_NAME, SAVE_GROUP_NAME_SUCCESS, SAVE_GROUP_NAME_FAIL],
    promise: (client) => client.post('/system/saveGroupName', {
      data: {
        groupId,
        name
      }
    }),
    groupId
  };
}

export function toggleDeleteGroupOpen(groupId) {
  return {
    type: TOGGLE_DELETE_GROUP_OPEN,
    groupId
  };
}

export function deleteGroup(groupId) {
  return {
    types: [DELETE_GROUP, DELETE_GROUP_SUCCESS, DELETE_GROUP_FAIL],
    promise: (client) => client.post('/system/deleteGroup', {
      data: {
        groupId
      }
    }),
    groupId
  };
}

export function newGroupEmitted(newGroupId, newGroupName) {
  return {
    type: NEW_GROUP_EMITTED,
    newGroupId,
    newGroupName
  };
}

export function groupNameChangeEmitted(groupId, newName) {
  return {
    type: GROUP_NAME_CHANGE_EMITTED,
    groupId,
    newName
  };
}

export function groupDeleteEmitted(groupId) {
  return {
    type: GROUP_DELETE_EMITTED,
    groupId
  };
}
