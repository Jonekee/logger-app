import React, {Component, PropTypes} from 'react';
import { LogGroupListItem } from 'components';
import styles from './LogGroupList.scss';

export default class LogGroupList extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired,
    group: PropTypes.object.isRequired,
    listFilter: PropTypes.string.isRequired
  };

  componentDidUpdate() {
    console.log('LogGroupList:cDU');
  }

  render() {
    const { groupId, group, listFilter } = this.props;
    let allLogsFiltered = group.logs.length > 0;
    return (
      <article className={styles.logGroupList}>
        <ul>
          {group.logs.length > 0
            ? group.logs.map((log, index) => {
              let output = null;
              if (!listFilter
                  || log.name.toLowerCase().indexOf(listFilter.toLowerCase()) > -1
                  || (log.fpath + log.fname).toLowerCase().indexOf(listFilter.toLowerCase()) > -1) {
                allLogsFiltered = false;
                output = <LogGroupListItem key={index} groupId={groupId} logId={index} log={log}/>;
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
