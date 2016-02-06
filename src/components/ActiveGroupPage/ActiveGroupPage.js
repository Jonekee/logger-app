import React, {Component, PropTypes} from 'react';
import { Icon, LogGroupListItem } from '../../components';
import styles from './ActiveGroupPage.scss';
import Helmet from 'react-helmet';

export default class ActiveGroupPage extends Component {
  static propTypes = {
    activeGroupListFilter: PropTypes.string,
    groups: PropTypes.array,
    setActiveGroupListFilter: PropTypes.func
  };

  componentDidUpdate() {
    console.log('ActiveGroupPage:cDU');
  }

  setActiveGroupListFilter = (event) => {
    const { setActiveGroupListFilter } = this.props;
    setActiveGroupListFilter(event.target.value);
  };

  render() {
    const { activeGroupListFilter, groups } = this.props;

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
      <section className={styles.activeGroupPage}>
        <Helmet title="Active Logs"/>
        <header>
          <h2>Active Logs</h2>
          <div>
            <input ref="filter" type="text" placeholder="Filter list..." value={activeGroupListFilter} onChange={this.setActiveGroupListFilter}/>
            <Icon iconName="magnify"/>
          </div>
        </header>
        <section>
          <article>
            <ul>
              {activeLogs.length > 0
                ? activeLogs.map((activeLog, index) => {
                  let output = null;
                  const log = groups[activeLog.groupId].logs[activeLog.logId];
                  if (!activeGroupListFilter
                      || log.name.toLowerCase().indexOf(activeGroupListFilter.toLowerCase()) > -1
                      || (log.fpath + log.fname).toLowerCase().indexOf(activeGroupListFilter.toLowerCase()) > -1) {
                    allActiveLogsFiltered = false;
                    output = <LogGroupListItem key={index} groupId={'' + activeLog.groupId} logId={activeLog.logId} log={log}/>;
                  }
                  return output;
                })
                : (
                  <li className={styles.noLogsLine}>
                    <p>No logs in this group</p>
                  </li>
                )
              }
              {allActiveLogsFiltered
                ? (
                  <li className={styles.noLogsLine}>
                    <p>No logs matching the filter &ldquo;{activeGroupListFilter}&rdquo;</p>
                  </li>
                )
                : null
              }
            </ul>
          </article>
        </section>
      </section>
    );
  }
}
