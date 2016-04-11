import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from '../../redux/modules/auth';
import { pushState } from 'redux-router';
import connectData from '../../helpers/connectData';
import config from '../../config';
import { SvgStore } from '../../components';

function fetchData(getState, dispatch) {
  const promises = [];
  if (!isAuthLoaded(getState())) {
    promises.push(dispatch(loadAuth()));
  }
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState(null, '/dashboard');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/login');
    }
  }

  componentDidUpdate() {
    console.log('App:cDU');
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <SvgStore/>
        {this.props.children}
      </div>
    );
  }
}
