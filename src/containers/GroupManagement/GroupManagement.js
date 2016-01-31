import React, { Component, PropTypes } from 'react';
import {isLoaded, load as loadGroups} from '../../redux/modules/groups';
import connectData from '../../helpers/connectData';
import {connect} from 'react-redux';
import { GroupManagementPage } from '../../components';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadGroups());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    groups: state.groups.data
  }))
export default class Group extends Component {
  static propTypes = {
    groups: PropTypes,
  };

  render() {
    const { groups } = this.props;
    return !!groups ? <GroupManagementPage groups={groups}/> : null;
  }
}
