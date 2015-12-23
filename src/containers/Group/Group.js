import React, { Component, PropTypes } from 'react';
import {isLoaded, load as loadGroups} from 'redux/modules/groups';
import connectData from 'helpers/connectData';
import {connect} from 'react-redux';
import { GroupPage } from 'components';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadGroups());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    groupId: state.router.params.groupId,
    groups: state.groups.data
  }))
export default class Group extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired,
    groups: PropTypes.array
  };

  render() {
    const { groupId, groups } = this.props;
    const group = groups[groupId];
    return (
      <GroupPage groupId={groupId} group={group}/>
    );
  }
}
