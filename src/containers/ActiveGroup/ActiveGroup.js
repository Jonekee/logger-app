import React, { Component, PropTypes } from 'react';
import { isLoaded, setActiveGroupListFilter, load as loadGroups } from 'redux/modules/groups';
import connectData from 'helpers/connectData';
import { connect } from 'react-redux';
import { ActiveGroupPage } from 'components';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadGroups());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    activeGroupListFilter: state.groups.activeGroupListFilter,
    groups: state.groups.data
  }),
  { setActiveGroupListFilter })
export default class ActiveGroup extends Component {
  static propTypes = {
    activeGroupListFilter: PropTypes.string,
    groups: PropTypes.array,
    setActiveGroupListFilter: PropTypes.func
  };

  render() {
    const { activeGroupListFilter, groups, setActiveGroupListFilter } = this.props; // eslint-disable-line no-shadow
    return (
      <ActiveGroupPage activeGroupListFilter={activeGroupListFilter} groups={groups} setActiveGroupListFilter={setActiveGroupListFilter}/>
    );
  }
}
