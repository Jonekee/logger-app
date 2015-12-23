import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import styles from './NavPanelGroupItem.scss';

export default class NavPanelGroupItem extends Component {
  static propTypes = {
    groupId: PropTypes.number.isRequired,
    logId: PropTypes.number.isRequired,
    log: PropTypes.object.isRequired
  }

  render() {
    const { groupId, logId, log } = this.props;
    return (
      <li className={styles.navPanelGroupItem}>
        <Link to={'/dashboard/group/' + groupId + '/log/' + logId}>
          <i></i>
          <span>{log.name}</span>
        </Link>
      </li>
    );
  }
}
