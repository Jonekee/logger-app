import React, { Component, PropTypes } from 'react';
import {isLoaded, load as loadGroups, toggleEditGroupName, toggleDeleteGroup } from '../../redux/modules/groups';
import connectData from '../../helpers/connectData';
import {connect} from 'react-redux';
import { GroupManagementPage } from '../../components';

function fetchData(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadGroups());
  }
}

@connectData(fetchData)
@connect(
  state => ({
    groups: state.groups.data
  }),
  { toggleEditGroupName, toggleDeleteGroup })
export default class GroupManagement extends Component {
  static propTypes = {
    groups: PropTypes.array,
    toggleEditGroupName: PropTypes.func.isRequired,
    toggleDeleteGroup: PropTypes.func.isRequired
  };

  render() {
    const { groups, toggleEditGroupName, toggleDeleteGroup } = this.props; // eslint-disable-line
    return !!groups ? <GroupManagementPage groups={groups} toggleEditGroupName={toggleEditGroupName} toggleDeleteGroup={toggleDeleteGroup} /> : null;
  }
}
