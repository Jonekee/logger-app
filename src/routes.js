import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Chat,
    Home,
    Dashboard,
    DashboardHome,
    Group,
    Log,
    LogOutput,
    Widgets,
    About,
    Login,
    LoginSuccess,
    Survey,
    NotFound,
  } from 'containers';

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

      { /* Routes requiring login */ }
      <Route onEnter={requireLoggedInOrNoAuth}>
        <IndexRoute component={Home}/>
        <Route path="chat" component={Chat}/>
        <Route path="loginSuccess" component={LoginSuccess}/>
      </Route>

      { /* Routes */ }
      <Route path="about" component={About}/>
      <Route onEnter={requireLoggedOutAndAuth}>
        <Route path="login" component={Login}/>
      </Route>
      <Route path="survey" component={Survey}/>
      <Route path="widgets" component={Widgets}/>

      <Route path="dashboard" component={Dashboard} onEnter={requireLoggedInOrNoAuth}>
        <IndexRoute component={DashboardHome}/>
        <Route path="group/:groupId" component={Group}/>
        <Route path="group/:groupId/log/:logId" component={Log}>
          <IndexRoute component={LogOutput}/>
          <Route path="output" component={LogOutput}/>
          <Route path="analysis" component={LogOutput}/>
        </Route>
        <Route path="admin" component={Group}/>
        <Route path="settings" component={Group}/>
        <Route path="logout" component={Group}/>
      </Route>


      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
