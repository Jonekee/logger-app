import React from 'react';
import { IndexRoute, IndexRedirect, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from './redux/modules/auth';
import {
    ActiveGroup,
    Admin,
    Analysis,
    App,
    Dashboard,
    DashboardHome,
    Group,
    GroupManagement,
    Log,
    Login,
    LogOutput,
    NotFound,
  } from './containers';

export default (store) => {
  const requireLoggedInOrNoAuth = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { enabled, user }} = store.getState();
      if (enabled && !user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/login');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const requireLoggedOutAndAuth = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { enabled, user }} = store.getState();
      if (!enabled || !!user) {
        replaceState(null, '/dashboard');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRedirect to="dashboard"/>

      <Route onEnter={requireLoggedOutAndAuth}>
        <Route path="login" component={Login}/>
      </Route>

      <Route path="dashboard" component={Dashboard} onEnter={requireLoggedInOrNoAuth}>
        <IndexRoute component={DashboardHome}/>

        { /* Group and Log pages */ }
        <Route path="active" component={ActiveGroup}/>
        <Route path="group/:groupId" component={Group}/>
        <Route path="group/:groupId/log/:logId" component={Log}>
          <IndexRoute component={LogOutput}/>
          <Route path="output" component={LogOutput}/>
          <Route path="analysis" component={Analysis}/>
        </Route>

        { /* Admin control pages */ }
        <Route path="admin" component={Admin}>
          <IndexRoute component={GroupManagement}/>
          <Route path="app" component={GroupManagement}/>
          <Route path="groups" component={GroupManagement}/>
          <Route path="logs" component={GroupManagement}/>
          <Route path="users" component={GroupManagement}/>
          <Route path="syntax" component={GroupManagement}/>
        </Route>
      </Route>


      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
