import React, { Component, PropTypes } from 'react';
import { setDashboardListFilter } from '../../redux/modules/appInterface';
import { isLoaded as groupsLoaded, load as loadGroups } from '../../redux/modules/groupz';
import { isLoaded as logsLoaded, load as loadLogs } from '../../redux/modules/logz';
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
    groupz: state.groupz.data,
    logz: state.logz.data
  }),
  { setDashboardListFilter })
export default class DashboardHome extends Component {
  static propTypes = {
    dashboardListFilter: PropTypes.string,
    setDashboardListFilter: PropTypes.func,
    groupz: PropTypes.object.isRequired,
    logz: PropTypes.object.isRequired
  };

  render() {
    return (
      <DashboardPage {...this.props}/>
    );
  }
}
