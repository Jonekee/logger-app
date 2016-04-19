import React, { Component, PropTypes } from 'react';
import { isLoaded as isGroupsLoaded, load as loadGroups } from '../../redux/modules/groups';
import { isLoaded as isLogsLoaded, load as loadLogs } from '../../redux/modules/logs';
import { isLoaded as isAppSettingsLoaded, load as loadAppSettings, clearError as clearAppSettingsError } from '../../redux/modules/appManagement';
import connectData from '../../helpers/connectData';
import { connect } from 'react-redux';
import { NavPanel, NotificationArea, SocketEventHandler } from '../../components';
import styles from './Dashboard.scss';


function fetchData(getState, dispatch) {
  const promises = [];
  if (!isGroupsLoaded(getState())) {
    promises.push(dispatch(loadGroups()));
  }
  if (!isLogsLoaded(getState())) {
    promises.push(dispatch(loadLogs()));
  }
  if (!isAppSettingsLoaded(getState())) {
    promises.push(dispatch(loadAppSettings()));
  }
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  state => ({
    authEnabled: state.auth.enabled,
    groups: state.groups.data,
    logs: state.logs.data,
    appSettingsError: state.appManagement.error
  }),
  { clearAppSettingsError })
export default class Dashboard extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    authEnabled: PropTypes.bool,
    groups: PropTypes.object.isRequired,
    logs: PropTypes.object.isRequired,
    appSettingsError: PropTypes.array,
    clearAppSettingsError: PropTypes.func.isRequired
  };

  render() {
    const { authEnabled, groups, logs, appSettingsError, clearAppSettingsError } = this.props; // eslint-disable-line
    return (
      <div className={styles.dashboard}>
        <SocketEventHandler />
        <NavPanel authEnabled={authEnabled} groups={groups} logs={logs} />
        <main>
          {this.props.children}
          <NotificationArea/>
        </main>
      </div>
    );
  }
}
