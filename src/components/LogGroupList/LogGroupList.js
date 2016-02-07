import React, {Component, PropTypes} from 'react';
import { LogGroupListItem } from '../../components';
import styles from './LogGroupList.scss';

export default class LogGroupList extends Component {
  static propTypes = {
    listFilter: PropTypes.string.isRequired,
    logs: PropTypes.array.isRequired
  };

  shouldComponentUpdate(nextProps) {
    /*  This component should only update if the IDs, name, activeState or
     *  isVisisble values change.
     *
     *  This is actually a lot more elegant than it may seem as if say the
     *  group name is the change, the later comparisons won't actually be made.
     */
    return this.props.listFilter !== nextProps.listFilter
      || this.props.logs.reduce((prevValue, currLog, index) => {
        const nextLog = nextProps.logs[index];
        return prevValue
          || currLog.logId !== nextLog.logId
          || currLog.groupId !== nextLog.groupId
          || currLog.logName !== nextLog.logName
          || currLog.logFileName !== nextLog.logFileName
          || currLog.logFilePath !== nextLog.logFilePath
          || currLog.logStatus !== nextLog.logStatus
          || currLog.logHasNew !== nextLog.logHasNew;
      }, false);
  }

  componentDidUpdate() {
    console.log('LogGroupList:cDU');
  }

  render() {
    const { listFilter, logs } = this.props;
    let allLogsFiltered = logs.length > 0;
    return (
      <article className={styles.logGroupList}>
        <ul>
          {logs.length > 0
            ? logs.map((log, index) => {
              let output = null;
              if (!listFilter
                  || log.logName.toLowerCase().indexOf(listFilter.toLowerCase()) > -1
                  || (log.logFilePath + log.logFileName).toLowerCase().indexOf(listFilter.toLowerCase()) > -1) {
                allLogsFiltered = false;
                output = <LogGroupListItem key={index} {...log} listFilter={listFilter}/>;
              }
              return output;
            })
            : (
              <li className={styles.noLogsLine}>
                <p>There are no logs in this group</p>
              </li>
            )
          }
          {allLogsFiltered
            ? (
              <li className={styles.noLogsLine}>
                <p>No logs matching the filter &ldquo;{listFilter}&rdquo;</p>
              </li>
            )
            : null
          }
        </ul>
      </article>
    );
  }
}
