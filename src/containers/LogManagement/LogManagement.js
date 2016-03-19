import React, { Component, PropTypes } from 'react';
import { isLoaded, load as loadGroups } from '../../redux/modules/groups';
import { toggleSortByGroup, toggleInputingNewGroup, setNewLogGroup } from '../../redux/modules/logManagement';
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
    logManagementState: state.logManagement
  }),
  { toggleSortByGroup, toggleInputingNewGroup, setNewLogGroup })
export default class LogManagement extends Component {
  static propTypes = {
    groups: PropTypes.array,
    logManagementState: PropTypes.object.isRequired,
    toggleSortByGroup: PropTypes.func.isRequired,
    toggleInputingNewGroup: PropTypes.func.isRequired,
    setNewLogGroup: PropTypes.func.isRequired
  };

  render() {
    const { groups } = this.props;
    return !!groups ? <LogManagementPage {...this.props} /> : null;
  }
}
