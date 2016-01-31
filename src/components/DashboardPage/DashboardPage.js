import React, {Component, PropTypes} from 'react';
import { Icon, LogGroupList, LogGroupListItem } from '../../components';
import styles from './DashboardPage.scss';
import DocumentMeta from 'react-document-meta';

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
              groupId,
              logId
            });
          }
        });
      });
    }

    activeLogs.sort((first, second) => {
      const firstName = groups[first.groupId].logs[first.logId].name;
      const secondName = groups[second.groupId].logs[second.logId].name;
      return firstName > secondName;
    });

    let allActiveLogsFiltered = activeLogs.length > 0;

    return (
      <section className={styles.dashboardPage}>
        <DocumentMeta title="Logger - Dashboard"/>
        <header>
          <h2>Dashboard</h2>
          <div>
            <input ref="filter" type="text" placeholder="Filter list..." value={dashboardListFilter} onChange={this.setDashboardListFilter}/>
            <Icon iconName="magnify"/>
          </div>
        </header>
        <section>
          <article>
            <h3>Active Logs</h3>
            <ul>
              {activeLogs.length > 0
                ? activeLogs.map((activeLog, index) => {
                  let output = null;
                  const log = groups[activeLog.groupId].logs[activeLog.logId];
                  if (!dashboardListFilter
                      || log.name.toLowerCase().indexOf(dashboardListFilter.toLowerCase()) > -1
                      || (log.fpath + log.fname).toLowerCase().indexOf(dashboardListFilter.toLowerCase()) > -1) {
                    allActiveLogsFiltered = false;
                    output = <LogGroupListItem key={index} groupId={'' + activeLog.groupId} logId={activeLog.logId} log={log}/>;
                  }
                  return output;
                })
                : (
                  <li className={styles.noLogsLine}>
                    <p>There are no logs in this group</p>
                  </li>
                )
              }
              {allActiveLogsFiltered
                ? (
                  <li className={styles.noLogsLine}>
                    <p>No logs matching the filter &ldquo;{dashboardListFilter}&rdquo;</p>
                  </li>
                )
                : null
              }
            </ul>
          </article>
          {groups.map((group, index) => (
            <article key={index}>
              <h3>{group.name}</h3>
              <LogGroupList groupId={'' + index} group={group} listFilter={dashboardListFilter}/>
            </article>
          ))}
        </section>
      </section>
    );
  }
}
