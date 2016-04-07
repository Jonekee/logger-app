import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import styles from './NavPanelGroupItem.scss';

export default class NavPanelGroupItem extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired,
    logId: PropTypes.string.isRequired,
    logName: PropTypes.string.isRequired,
    logStatus: PropTypes.string.isRequired,
    logHasNew: PropTypes.bool.isRequired,
    isVisible: PropTypes.bool
  };

  shouldComponentUpdate(nextProps) {
    /*  This component should only update if the IDs, name, activeState or
     *  isVisisble values change.
     */
    return this.props.groupId !== nextProps.groupId
      || this.props.logId !== nextProps.logId
      || this.props.logName !== nextProps.logName
      || this.props.logStatus !== nextProps.logStatus
      || this.props.logHasNew !== nextProps.logHasNew
      || this.props.isVisible !== nextProps.isVisible;
  }

  render() {
    const { groupId, logId, logName, logStatus, logHasNew, isVisible } = this.props;
    let colorClass;
    switch (logStatus) {
      case 'ACTIVE':
        colorClass = logHasNew ? styles.active : styles.idle;
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
          <span>{logName}</span>
        </Link>
      </li>
    );
  }
}
