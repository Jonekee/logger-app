import React, { Component, PropTypes } from 'react';
import { toggleSortByGroup, toggleInputingNewGroup, setNewLogName, setNewLogGroup, setNewLogFile, setNewLogPath, createNewLog } from '../../redux/modules/logManagement';
import {connect} from 'react-redux';
import { LogManagementPage } from '../../components';

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
