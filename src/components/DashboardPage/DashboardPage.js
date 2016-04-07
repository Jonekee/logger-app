import React, {Component, PropTypes} from 'react';
import { Icon, LogGroupList } from '../../components';
import styles from './DashboardPage.scss';
import Helmet from 'react-helmet';

export default class DashboardPage extends Component {
  static propTypes = {
    dashboardListFilter: PropTypes.string.isRequired,
    setDashboardListFilter: PropTypes.func.isRequired,
    groupz: PropTypes.object.isRequired,
    logz: PropTypes.object.isRequired
  };

  componentDidUpdate() {
    console.log('DashboardPage:cDU');
  }

  setDashboardListFilter = (event) => {
    const { setDashboardListFilter } = this.props;
    setDashboardListFilter(event.target.value);
  };

  render() {
    const { dashboardListFilter, groupz, logz } = this.props;

    const activeLogs = [];
    const groupLists = [];


    Object.keys(groupz).forEach((groupId) => {
      const group = groupz[groupId];
      const logs = [];

      group.logs.forEach((logId) => {
        const log = logz[logId];

        // Add log to group list
        logs.push({
          logId,
          groupId,
          logName: log.name,
          logFileName: log.fname,
          logFilePath: log.fpath,
          logStatus: log.activeState,
          logHasNew: log.hasNew
        });

        // Add log to active list if isn't inactive
        if (log.activeState !== 'INACTIVE') {
          activeLogs.push({
            logId,
            groupId,
            logName: log.name,
            logFileName: log.fname,
            logFilePath: log.fpath,
            logStatus: log.activeState,
            logHasNew: log.hasNew
          });
        }
      });

      logs.sort((first, second) => (first.logName > second.logName));

      groupLists.push({
        groupId,
        logs,
        listFilter: dashboardListFilter,
        groupName: group.name,
      });
    });

    // Sort groups based on name
    groupLists.sort((first, second) => (first.groupName > second.groupName));

    // Sort active logs and push to start of list
    activeLogs.sort((first, second) => (first.logName > second.logName));
    groupLists.unshift({
      groupId: '-1',
      groupName: 'Active Group',
      listFilter: dashboardListFilter,
      logs: activeLogs
    });


    return (
      <section className={styles.dashboardPage}>
        <Helmet title="Dashboard"/>
        <header>
          <h2>Dashboard</h2>
          <div>
            <input ref="filter" type="text" placeholder="Filter list..." value={dashboardListFilter} onChange={this.setDashboardListFilter}/>
            <Icon iconName="magnify"/>
          </div>
        </header>
        <section>
          {groupLists.map((groupList) => (
            <article key={groupList.groupId}>
              <h3>{groupList.groupName}</h3>
              <LogGroupList {...groupList}/>
            </article>
          ))}
        </section>
      </section>
    );
  }
}
