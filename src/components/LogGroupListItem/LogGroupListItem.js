import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import styles from './LogGroupListItem.scss';

export default class LogGroupListItem extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired,
    logId: PropTypes.number.isRequired,
    log: PropTypes.object.isRequired
  };

  componentDidUpdate() {
    console.log('LogGroupListItem:cDU');
  }

  render() {
    const { groupId, logId, log } = this.props;
    let colorClass;
    switch (log.activeState) {
      case 'ACTIVE':
        colorClass = log.hasNew ? styles.active : styles.idle;
        break;
      case 'PAUSED':
        colorClass = styles.paused;
        break;
      case 'INACTIVE_WITH_OUTPUT':
        colorClass = styles.hasOutput;
        break;
      default:
        colorClass = '';
        break;
    }
    return (
      <li className={styles.logGroupListItem}>
        <Link to={'/dashboard/group/' + groupId + '/log/' + logId}>
          <i className={colorClass}></i>
          <div>
            <p>{log.name}</p>
            <p>{log.fpath + log.fname}</p>
          </div>
        </Link>
      </li>
    );
  }
}
