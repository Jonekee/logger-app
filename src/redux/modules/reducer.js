import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import appInterface from './appInterface';
import auth from './auth';
import groups from './groups';
import logs from './logs';
import groupManagement from './groupManagement';
import logManagement from './logManagement';
import appManagement from './appManagement';

export default combineReducers({
  router: routerStateReducer,
  appInterface,
  auth,
  groups,
  logs,
  groupManagement,
  logManagement,
  appManagement
});
