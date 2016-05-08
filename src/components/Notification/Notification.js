import React, {Component, PropTypes} from 'react';
import styles from './Notification.scss';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Icon } from '../../components';
import { clearNotification } from '../../redux/modules/notifications.js';

@connect(null, { clearNotification })
export default class Notification extends Component {
  static propTypes = {
    position: PropTypes.number.isRequired,
    notification: PropTypes.object.isRequired,
    clearNotification: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      progress: 0,
      intervalId: null,
      isOpening: true,
      isClosing: false
    };
  }

  componentDidMount() {
    // Set auto clear count down if is INFO
    if (this.props.notification.type === 'INFO') {
      this.startProgress();
    }
    if (__CLIENT__) {
      setTimeout(() => this.setState({ isOpening: false }), 500);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.progress !== this.state.progress
      || nextState.isOpening !== this.state.isOpening
      || nextState.isClosing !== this.state.isClosing
      || nextProps.notification.type !== this.props.notification.type
      || nextProps.notification.message !== this.props.notification.message;
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  pauseProgress = () => {
    clearInterval(this.state.intervalId);
  };

  startProgress = () => {
    if (!this.state.intervalId) {
      const duration = 20000; // 10s
      const steps = 1200; // 1200 = 60fps
      const intervalId = setInterval(() => {
        if (this.state.progress < 1) {
          this.setState({ progress: this.state.progress + (1 / steps) });
        } else {
          // Clear panel
          clearInterval(this.state.intervalId);
          this.setState({ intervalId: null });
          this.closeNotification();
        }
      }, duration / steps);
      this.setState({ intervalId });
    }
  };

  closeNotification = () => {
    this.setState({ isClosing: true });
    setTimeout(() => this.props.clearNotification(this.props.position), 500);
  };

  render() {
    const { notification } = this.props; // eslint-disable-line
    const { progress, isOpening, isClosing } = this.state;

    const cname = classnames(
      styles.notification,
      {
        [styles.opening]: isOpening,
        [styles.closing]: isClosing,
        [styles.errorPanel]: notification.type === 'ERROR',
        [styles.infoPanel]: notification.type === 'INFO',
      }
    );

    const displayedProgress = progress > 1 ? 100 : 100 * progress;
    const endBorderRadius = displayedProgress < 99 ? 0 : (displayedProgress - 99) * 4;

    return (
      <div className={cname} onMouseEnter={notification.type === 'INFO' && this.pauseProgress} onMouseLeave={notification.type === 'INFO' && this.startProgress}>
        <p>{notification.message}</p>
        <button onClick={this.closeNotification}>
          <Icon iconName="close" />
        </button>
        {notification.type === 'INFO' && (
          <div className={styles.autoClearBar} style={{width: displayedProgress + '%', borderBottomRightRadius: endBorderRadius + 'px' }}></div>
        )}
      </div>
    );
  }
}
