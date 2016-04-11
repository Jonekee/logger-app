import React, { Component, PropTypes } from 'react';
import { isLoaded as isGroupsLoaded, load as loadGroups, newGroupEmitted, groupNameChangeEmitted, groupDeleteEmitted } from '../../redux/modules/groups';
import { isLoaded as isLogsLoaded, load as loadLogs, addLineToLog } from '../../redux/modules/logs';
import {isLoaded as isSystemSettingsLoaded, load as loadSystemSettings, clearError as clearAppSettingsError} from '../../redux/modules/appManagement';
import connectData from '../../helpers/connectData';
import { connect } from 'react-redux';
import { NavPanel, ErrorPanel } from '../../components';
import styles from './Dashboard.scss';


function fetchData(getState, dispatch) {
  const promises = [];
  if (!isGroupsLoaded(getState())) {
    promises.push(dispatch(loadGroups()));
  }
  if (!isLogsLoaded(getState())) {
    promises.push(dispatch(loadLogs()));
  }
  if (!isSystemSettingsLoaded(getState())) {
    promises.push(dispatch(loadSystemSettings()));
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
  { addLineToLog, clearAppSettingsError, newGroupEmitted, groupNameChangeEmitted, groupDeleteEmitted })
export default class Dashboard extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    authEnabled: PropTypes.bool,
    addLineToLog: PropTypes.func,
    newGroupEmitted: PropTypes.func.isRequired,
    groupNameChangeEmitted: PropTypes.func.isRequired,
    groupDeleteEmitted: PropTypes.func.isRequired,
    groups: PropTypes.object.isRequired,
    logs: PropTypes.object.isRequired,
    appSettingsError: PropTypes.array,
    clearAppSettingsError: PropTypes.func.isRequired
  };

  componentDidMount() {
    // Register all socket listeners here
    socket.on('lineUpdate', data => {
      this.props.addLineToLog(data.logId, data.newLine);
    });

    socket.on('group:newGroup', data => {
      console.log('group:newGroup: ' + data.newGroupId + ', ' + data.newGroupName);
      this.props.newGroupEmitted(data.newGroupId, data.newGroupName);
    });

    socket.on('group:nameChange', data => {
      console.log('group:nameChange: ' + data.groupId + ', ' + data.newName);
      this.props.groupNameChangeEmitted(data.groupId, data.newName);
    });

    socket.on('group:groupDelete', data => {
      this.props.groupDeleteEmitted(data.groupId, data.groupName);
    });
  }

  render() {
    const { authEnabled, groups, logs, appSettingsError, clearAppSettingsError } = this.props; // eslint-disable-line
    return (
      <div className={styles.dashboard}>
        <NavPanel authEnabled={authEnabled} groups={groups} logs={logs} />
        <main>
          <ErrorPanel appSettingsError={appSettingsError} clearAppSettingsError={clearAppSettingsError}/>
          {this.props.children}
        </main>
      </div>
    );
  }
}
