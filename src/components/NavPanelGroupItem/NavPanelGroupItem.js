import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import styles from './NavPanelGroupItem.scss';

export default class NavPanelGroupItem extends Component {
  static propTypes = {
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
    return this.props.logId !== nextProps.logId
      || this.props.logName !== nextProps.logName
      || this.props.logStatus !== nextProps.logStatus
      || this.props.logHasNew !== nextProps.logHasNew
      || this.props.isVisible !== nextProps.isVisible;
  }

  render() {
    const { logId, logName, logStatus, logHasNew, isVisible } = this.props;
    let colorClass;
    let activeTitle;
    switch (logStatus) {
      case 'ACTIVE':
        colorClass = logHasNew ? styles.active : styles.idle;
        activeTitle = logHasNew ? 'Has updates' : 'Watching for updates';
        break;
      case 'PAUSED':
        colorClass = styles.paused;
        activeTitle = 'Updating paused';
        break;
      case 'INACTIVE_WITH_OUTPUT':
        colorClass = styles.hasOutput;
        activeTitle = 'Inactive with output';
        break;
      default:
        colorClass = '';
        activeTitle = 'Inactive';
        break;
    }

    return (
      <li className={styles.navPanelGroupItem}>
        <Link to={'/dashboard/log/' + logId} tabIndex={isVisible ? '0' : '-1'} title={`${logName} - ${activeTitle}`}>
          <i className={colorClass}></i>
          <span>{logName}</span>
        </Link>
      </li>
    );
  }
}
