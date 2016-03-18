import React, { Component, PropTypes } from 'react';
import styles from './LogManagementPage.scss';
import Helmet from 'react-helmet';
import { Icon, LogManagementPageLogPanel } from '../../components';

export default class LogManagementPage extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    logManagementState: PropTypes.object.isRequired,
    toggleSortByGroup: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    console.log('LogManagementPage:cDU');
  }

  render() {
    const { groups, logManagementState, toggleSortByGroup } = this.props;

    let fullLogList;
    if (!logManagementState.sortByGroup) {
      fullLogList = [];

      groups.forEach((group, groupId) => {
        group.logs.forEach((log, logId) => {
          fullLogList.push({
            ...log,
            logId,
            groupId
          });
        });
      });

      fullLogList.sort((first, second) => {
        const firstName = first.name;
        const secondName = second.name;
        return firstName > secondName;
      });
    }

    return (
      <section className={styles.logManagementPage}>
        <Helmet title="Admin - Logs"/>
        <header>
          <h2>Log Management</h2>
          <div className={styles.actions}>
            <div>
              <label htmlFor="logManagementPageSortByGroup">Sort by group</label>
              <input id="logManagementPageSortByGroup" type="checkbox" checked={logManagementState.sortByGroup} onChange={toggleSortByGroup} />
            </div>
          </div>
        </header>
        <section>
          <button className={styles.addButton} onClick={() => {}}>
            <Icon iconName="plus"/>
            <p>New Log</p>
          </button>
          <div className={styles.listContainer}>
            {logManagementState.sortByGroup
              ? groups.map((group, index) => (
                <div key={index}>
                  <h3>{group.name}</h3>
                  <ol>
                    {group.logs.length > 0
                      ? group.logs.map((log, iindex) => (<li key={iindex}><LogManagementPageLogPanel groupId={index} logId={iindex} log={log}/></li>))
                      : (
                        <li className={styles.noLogsLine}><p>There are no logs in this group</p></li>
                      )
                    }
                  </ol>
                </div>
              ))
              : (
                <ol className={styles.singleList}>
                  {fullLogList.map((log, iindex) => (<li key={iindex}><LogManagementPageLogPanel groupName={groups[log.groupId].name} groupId={log.groupId} logId={log.logId} log={log}/></li>))}
                </ol>
              )
            }
          </div>
        </section>
      </section>
    );
  }
}
