import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import styles from './LogGroupListItem.scss';

export default class LogGroupListItem extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired,
    logId: PropTypes.number.isRequired,
    log: PropTypes.object.isRequired
  }

  render() {
    const { groupId, logId, log } = this.props;
    return (
      <li className={styles.logGroupListItem}>
        <Link to={'/dashboard/group/' + groupId + '/log/' + logId}>
          <i></i>
          <div>
            <p>{log.name}</p>
            <p>{log.fpath + log.fname}</p>
          </div>
        </Link>
      </li>
    );
  }
}
