import React, { Component, PropTypes } from 'react';
import {isLoaded, load as loadGroups} from 'redux/modules/groups';
import connectData from 'helpers/connectData';
import {connect} from 'react-redux';
import { DashboardPage } from 'components';

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
export default class DashboardHome extends Component {
  static propTypes = {
    groups: PropTypes.array
  };

  render() {
    const { groups } = this.props;
    return (
      <DashboardPage groups={groups}/>
    );
  }
}
