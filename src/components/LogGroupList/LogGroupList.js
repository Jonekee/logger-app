import React, {Component, PropTypes} from 'react';
import LogGroupListItem from './LogGroupListItem/LogGroupListItem';
import styles from './LogGroupList.scss';

export default class LogGroupList extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired,
    group: PropTypes.object.isRequired
  }

  render() {
    const { groupId, group } = this.props;
    return (
      <article className={styles.logGroupList}>
        <ul>
          {group.logs.map((log, index) => <LogGroupListItem key={index} groupId={groupId} logId={index} log={log}/>)}
        </ul>
      </article>
    );
  }
}
