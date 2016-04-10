import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import appInterface from './appInterface';
import auth from './auth';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import groupz from './groupz';
import logz from './logz';
import groupManagement from './groupManagement';
import logManagement from './logManagement';
import appManagement from './appManagement';

export default combineReducers({
  router: routerStateReducer,
  appInterface,
  auth,
  form,
  info,
  widgets,
  groupz,
  logz,
  groupManagement,
  logManagement,
  appManagement
});
