import React, { Component, PropTypes } from 'react';
import { isLoaded, load as loadGroups } from '../../redux/modules/groups';
import { toggleSortByGroup, toggleInputingNewGroup, setNewLogName, setNewLogGroup, setNewLogFile, setNewLogPath, createNewLog } from '../../redux/modules/logManagement';
import connectData from '../../helpers/connectData';
import {connect} from 'react-redux';
import { LogManagementPage } from '../../components';

function fetchData(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadGroups());
  }
}

@connectData(fetchData)
@connect(
  state => ({
    groups: state.groups.data,
    logs: state.logs.data,
    logManagementState: state.logManagement
  }),
  { toggleSortByGroup, toggleInputingNewGroup, setNewLogName, setNewLogGroup, setNewLogFile, setNewLogPath, createNewLog })
export default class LogManagement extends Component {
  static propTypes = {
    groups: PropTypes.object.isRequired,
    logs: PropTypes.object.isRequired,
    logManagementState: PropTypes.object.isRequired,
    toggleSortByGroup: PropTypes.func.isRequired,
    toggleInputingNewGroup: PropTypes.func.isRequired,
    setNewLogName: PropTypes.func.isRequired,
    setNewLogGroup: PropTypes.func.isRequired,
    setNewLogFile: PropTypes.func.isRequired,
    setNewLogPath: PropTypes.func.isRequired
  };

  render() {
    return <LogManagementPage {...this.props} />;
  }
}
