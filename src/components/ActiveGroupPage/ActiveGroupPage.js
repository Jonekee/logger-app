import React, {Component, PropTypes} from 'react';
import { Icon, LogGroupList } from '../../components';
import styles from './ActiveGroupPage.scss';
import Helmet from 'react-helmet';

export default class ActiveGroupPage extends Component {
  static propTypes = {
    activeGroupListFilter: PropTypes.string,
    groups: PropTypes.object.isRequired,
    logs: PropTypes.object.isRequired,
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
    const { activeGroupListFilter, groups, logs } = this.props;

    const activeLogs = [];
    if (groups) {
      Object.keys(groups).forEach(groupId => {
        const group = groups[groupId];
        group.logs.forEach(logId => {
          const log = logs[logId];
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

    activeLogs.sort((first, second) => (first.logName > second.logName));

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
