import React, {Component, PropTypes} from 'react';
import { Icon, LogGroupList } from '../../components';
import styles from './DashboardPage.scss';
import Helmet from 'react-helmet';

export default class DashboardPage extends Component {
  static propTypes = {
    dashboardListFilter: PropTypes.string.isRequired,
    groups: PropTypes.array.isRequired,
    setDashboardListFilter: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    console.log('DashboardPage:cDU');
  }

  setDashboardListFilter = (event) => {
    const { setDashboardListFilter } = this.props;
    setDashboardListFilter(event.target.value);
  };

  render() {
    const { dashboardListFilter, groups } = this.props;

    const activeLogs = [];
    if (groups) {
      groups.forEach((group, groupId) => {
        group.logs.forEach((log, logId) => {
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
      });
    }

    activeLogs.sort((first, second) => {
      const firstName = first.logName;
      const secondName = second.logName;
      return firstName > secondName;
    });

    const groupLists = [];

    groupLists.push({
      groupName: 'Active Logs',
      listFilter: dashboardListFilter,
      logs: activeLogs
    });

    if (groups) {
      groups.forEach((group, groupId) => {
        groupLists.push({
          groupName: group.name,
          listFilter: dashboardListFilter,
          logs: group.logs.map((log, logId) => ({
            logId,
            groupId,
            logName: log.name,
            logFileName: log.fname,
            logFilePath: log.fpath,
            logStatus: log.activeState,
            logHasNew: log.hasNew
          }))
        });
      });
    }

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
          {groupLists.map((groupList, index) => (
            <article key={index}>
              <h3>{groupList.groupName}</h3>
              <LogGroupList {...groupList}/>
            </article>
          ))}
        </section>
      </section>
    );
  }
}
