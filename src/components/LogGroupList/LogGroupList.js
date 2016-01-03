import React, {Component, PropTypes} from 'react';
import { LogGroupListItem } from 'components';
import styles from './LogGroupList.scss';

export default class LogGroupList extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired,
    group: PropTypes.object.isRequired,
    listFilter: PropTypes.string
  }

  render() {
    const { groupId, group, listFilter } = this.props;
    return (
      <article className={styles.logGroupList}>
        <ul>
          {group.logs.length > 0
            ? group.logs.map((log, index) => {
              let output = null;
              if (!listFilter || log.name.toLowerCase().indexOf(listFilter.toLowerCase()) > -1) {
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
        </ul>
      </article>
    );
  }
}
