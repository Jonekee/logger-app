import React, { Component, PropTypes } from 'react';
import {isLoaded, setGroupListFilter, load as loadGroups} from '../../redux/modules/groups';
import connectData from '../../helpers/connectData';
import {connect} from 'react-redux';
import { GroupPage } from '../../components';

function fetchData(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadGroups());
  }
}

@connectData(fetchData)
@connect(
  state => ({
    groupId: state.router.params.groupId,
    groups: state.groups.data
  }),
  { setGroupListFilter })
export default class Group extends Component {
  static propTypes = {
    groupId: PropTypes.string,
    groups: PropTypes.array.isRequired,
    setGroupListFilter: PropTypes.func.isRequired
  };

  render() {
    const { groupId, groups, setGroupListFilter } = this.props; // eslint-disable-line no-shadow
    const group = groups[groupId];
    return !!groupId ? <GroupPage groupId={groupId} group={group} setGroupListFilter={setGroupListFilter}/> : null;
  }
}
