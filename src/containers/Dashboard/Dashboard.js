import React, { Component, PropTypes } from 'react';
import {isLoaded as isGroupsLoaded, addLineToLog, load as loadGroups} from '../../redux/modules/groups';
import { isLoaded as isGroupzLoaded, load as loadGroupz } from '../../redux/modules/groupz';
import {isLoaded as isSystemSettingsLoaded, load as loadSystemSettings, clearError as clearAppSettingsError} from '../../redux/modules/system';
import connectData from '../../helpers/connectData';
import { connect } from 'react-redux';
import { NavPanel, ErrorPanel } from '../../components';


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
  { addLineToLog, clearAppSettingsError })
export default class Dashboard extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    authEnabled: PropTypes.bool,
    addLineToLog: PropTypes.func,
    groups: PropTypes.array.isRequired,
    appSettingsError: PropTypes.array,
    clearAppSettingsError: PropTypes.func.isRequired
  };

  componentDidMount() {
    socket.on('lineUpdate', data => {
      this.props.addLineToLog(data.groupId, data.logId, data.newLine);
    });
  }

  render() {
    const { authEnabled, groups, appSettingsError, clearAppSettingsError } = this.props; // eslint-disable-line
    const styles = require('./Dashboard.scss');
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
