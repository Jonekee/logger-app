import React, {Component, PropTypes} from 'react';
import { Notification } from '../../components';
import styles from './NotificationArea.scss';
import { connect } from 'react-redux';

@connect(state => ({ notifications: state.notifications }))
export default class NotificationArea extends Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  componentDidUpdate() {
    console.log('NotificationArea:cDU');
  }

  render() {
    const { notifications } = this.props;

    return (
      <div className={styles.notificationArea}>
        {notifications.map((notification, index) => <Notification key={index} notification={notification} position={index}/>)}
      </div>
    );
  }
}
