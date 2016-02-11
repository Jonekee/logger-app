import React, { Component, PropTypes } from 'react';
import {isLoaded, load as loadGroups} from '../../redux/modules/groups';
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
  }))
export default class GroupManagement extends Component {
  static propTypes = {
    groups: PropTypes.array,
  };

  render() {
    const { groups } = this.props;
    return !!groups ? <GroupManagementPage groups={groups}/> : null;
  }
}
