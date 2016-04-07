const TOGGLE_ACTIVE_NAV_GROUP_OPEN = 'logger-app/appInterface/TOGGLE_ACTIVE_NAV_GROUP_OPEN';
const SET_ACTIVE_GROUP_LIST_FILTER = 'logger-app/appInterface/SET_ACTIVE_GROUP_LIST_FILTER';
const SET_DASHBOARD_LIST_FILTER = 'logger-app/appInterface/SET_DASHBOARD_LIST_FILTER';

const initialState = {
  activeGroupNavOpen: true,
  activeGroupListFilter: '',
  dashboardListFilter: ''
};

export default function appInterface(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_ACTIVE_NAV_GROUP_OPEN:
      return {
        ...state,
        activeGroupNavOpen: !state.activeGroupNavOpen
      };
    case SET_ACTIVE_GROUP_LIST_FILTER:
      return {
        ...state,
        activeGroupListFilter: action.newListFilter
      };
    case SET_DASHBOARD_LIST_FILTER:
      return {
        ...state,
        dashboardListFilter: action.newListFilter
      };
    default:
      return state;
  }
}

export function toggleActiveNavGroupOpen() {
  return {
    type: TOGGLE_ACTIVE_NAV_GROUP_OPEN
  };
}

export function setActiveGroupListFilter(newListFilter) {
  return {
    type: SET_ACTIVE_GROUP_LIST_FILTER,
    newListFilter
  };
}

export function setDashboardListFilter(newListFilter) {
  return {
    type: SET_DASHBOARD_LIST_FILTER,
    newListFilter
  };
}
