import React, { Component, PropTypes } from 'react';
import {isLoaded as isGroupsLoaded, addLineToLog, load as loadGroups, newGroupEmitted, groupNameChangeEmitted, groupDeleteEmitted } from '../../redux/modules/groups';
import { isLoaded as isGroupzLoaded, load as loadGroupz } from '../../redux/modules/groupz';
import {isLoaded as isSystemSettingsLoaded, load as loadSystemSettings, clearError as clearAppSettingsError} from '../../redux/modules/system';
import connectData from '../../helpers/connectData';
import { connect } from 'react-redux';
import { NavPanel, ErrorPanel } from '../../components';
import styles from './Dashboard.scss';


function fetchData(getState, dispatch) {
  const promises = [];
  if (!isGroupsLoaded(getState())) {
    promises.push(dispatch(loadGroups()));
  }
  if (!isGroupzLoaded(getState())) {
    promises.push(dispatch(loadGroupz()));
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
    appSettingsError: state.system.error
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
    groups: PropTypes.array.isRequired,
    appSettingsError: PropTypes.array,
    clearAppSettingsError: PropTypes.func.isRequired
  };

  componentDidMount() {
    // Register all socket listeners here
    socket.on('lineUpdate', data => {
      this.props.addLineToLog(data.groupId, data.logId, data.newLine);
    });

    socket.on('group:newGroup', data => {
      console.log('newGroupName: ' + data.newGroupName);
      this.props.newGroupEmitted(data.newGroupName);
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
    const { authEnabled, groups, appSettingsError, clearAppSettingsError } = this.props; // eslint-disable-line
    return (
      <div className={styles.dashboard}>
        <NavPanel authEnabled={authEnabled} groups={groups}/>
        <main>
          <ErrorPanel appSettingsError={appSettingsError} clearAppSettingsError={clearAppSettingsError}/>
          {this.props.children}
        </main>
      </div>
    );
  }
}
