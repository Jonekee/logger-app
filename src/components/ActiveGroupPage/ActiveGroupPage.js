import React, {Component, PropTypes} from 'react';
import { Icon, LogGroupList } from '../../components';
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

    const groupList = {
      listFilter: activeGroupListFilter,
      logs: activeLogs
    };

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
          <LogGroupList {...groupList}/>
        </section>
      </section>
    );
  }
}
