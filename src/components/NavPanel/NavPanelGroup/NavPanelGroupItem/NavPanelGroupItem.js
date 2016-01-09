import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import styles from './NavPanelGroupItem.scss';

export default class NavPanelGroupItem extends Component {
  static propTypes = {
    groupId: PropTypes.number.isRequired,
    logId: PropTypes.number.isRequired,
    log: PropTypes.object.isRequired,
    isVisible: PropTypes.bool
  }

  render() {
    const { groupId, logId, log, isVisible } = this.props;
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
      <li className={styles.navPanelGroupItem}>
        <Link to={'/dashboard/group/' + groupId + '/log/' + logId} tabIndex={isVisible ? '0' : '-1'}>
          <i className={colorClass}></i>
          <span>{log.name}</span>
        </Link>
      </li>
    );
  }
}
