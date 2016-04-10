import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import { HighlightedText } from '../../components';
import styles from './LogGroupListItem.scss';

export default class LogGroupListItem extends Component {
  static propTypes = {
    logId: PropTypes.string.isRequired,
    logName: PropTypes.string.isRequired,
    logFileName: PropTypes.string.isRequired,
    logFilePath: PropTypes.string.isRequired,
    logStatus: PropTypes.string.isRequired,
    logHasNew: PropTypes.bool.isRequired,
    listFilter: PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    /*  Should only update if IDs, name, file name, file path, activeState,
     *  hasNew or listFilter change
     */
    return this.props.logId !== nextProps.logId
      || this.props.logName !== nextProps.logName
      || this.props.logFilePath !== nextProps.logFilePath
      || this.props.logFileName !== nextProps.logFileName
      || this.props.logHasNew !== nextProps.logHasNew
      || this.props.logStatus !== nextProps.logStatus
      || this.props.listFilter !== nextProps.listFilter;
  }

  componentDidUpdate() {
    console.log('LogGroupListItem:cDU');
  }

  render() {
    const { logId, logName, logFilePath, logFileName, logStatus, logHasNew, listFilter } = this.props;
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
      <li className={styles.logGroupListItem}>
        <Link to={'/dashboard/log/' + logId}>
          <i className={colorClass}></i>
          <div>
            <p><HighlightedText text={logName} matchText={listFilter}/></p>
            <p><HighlightedText text={logFilePath + logFileName} matchText={listFilter}/></p>
          </div>
        </Link>
      </li>
    );
  }
}
