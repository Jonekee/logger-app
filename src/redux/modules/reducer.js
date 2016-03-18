import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import groups from './groups';
import groupManagement from './groupManagement';
import logManagement from './logManagement';
import system from './system';

export default combineReducers({
  router: routerStateReducer,
  auth,
  form,
  info,
  widgets,
  groups,
  groupManagement,
  logManagement,
  system
});
