import React, { Component, PropTypes } from 'react';
import { isLoaded, load as loadGroups, setDashboardListFilter } from '../../redux/modules/groups';
import connectData from '../../helpers/connectData';
import { connect } from 'react-redux';
import { DashboardPage } from '../../components';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadGroups());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    groups: state.groups.data,
    dashboardListFilter: state.groups.dashboardListFilter
  }),
  { setDashboardListFilter })
export default class DashboardHome extends Component {
  static propTypes = {
    groups: PropTypes.array,
    dashboardListFilter: PropTypes.string,
    setDashboardListFilter: PropTypes.func
  };

  render() {
    const { groups, dashboardListFilter, setDashboardListFilter } = this.props; // eslint-disable-line
    return (
      <DashboardPage groups={groups} dashboardListFilter={dashboardListFilter} setDashboardListFilter={setDashboardListFilter}/>
    );
  }
}
