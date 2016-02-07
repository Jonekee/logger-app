import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import { HighlightedText } from '../../components';
import styles from './LogGroupListItem.scss';

export default class LogGroupListItem extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired,
    logId: PropTypes.number.isRequired,
    log: PropTypes.object.isRequired,
    listFilter: PropTypes.string
  };

  componentDidUpdate() {
    console.log('LogGroupListItem:cDU');
  }

  render() {
    const { groupId, logId, log, listFilter } = this.props;
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
            <p><HighlightedText text={log.name} matchText={listFilter}/></p>
            <p><HighlightedText text={log.fpath + log.fname} matchText={listFilter}/></p>
          </div>
        </Link>
      </li>
    );
  }
}
