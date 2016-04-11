import React, { Component, PropTypes } from 'react';
import { setDashboardListFilter } from '../../redux/modules/appInterface';
import { isLoaded as groupsLoaded, load as loadGroups } from '../../redux/modules/groups';
import { isLoaded as logsLoaded, load as loadLogs } from '../../redux/modules/logs';
import connectData from '../../helpers/connectData';
import { connect } from 'react-redux';
import { DashboardPage } from '../../components';

function fetchData(getState, dispatch) {
  const promises = [];
  if (!groupsLoaded(getState())) {
    promises.push(dispatch(loadGroups()));
  }
  if (!logsLoaded(getState())) {
    promises.push(dispatch(loadLogs()));
  }
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  state => ({
    dashboardListFilter: state.appInterface.dashboardListFilter,
    groups: state.groups.data,
    logs: state.logs.data
  }),
  { setDashboardListFilter })
export default class DashboardHome extends Component {
  static propTypes = {
    dashboardListFilter: PropTypes.string,
    setDashboardListFilter: PropTypes.func,
    groups: PropTypes.object.isRequired,
    logs: PropTypes.object.isRequired
  };

  render() {
    return (
      <DashboardPage {...this.props}/>
    );
  }
}
