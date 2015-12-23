import React, {Component, PropTypes} from 'react';
import styles from './LogPage.scss';
import ControlButton from './ControlButton/ControlButton';

export default class LogPage extends Component {
  static propTypes = {
    logId: PropTypes.string,
    log: PropTypes.object
  }

  render() {
    const { log } = this.props;
    let headerActions;
    switch (log.active) {
      case 'ACTIVE' :
        headerActions = [
          <ControlButton iconName="pause" text="Pause watching" color="warning"/>,
          <ControlButton iconName="stop" text="Stop watching" color="negative"/>
        ];
        break;
      case 'INACTIVE' :
        // Use default
      default:
        headerActions = (
          <ControlButton iconName="play" text="Start watching" color="positive"/>
        );
        break;
    }
    return (
      <section className={styles.logPage}>
        <header>
          <div className={styles.row}>
            <h2>{log.name}</h2>
            <div className={styles.rhs}>
              {headerActions}
            </div>
          </div>
        </header>
        <section>
        </section>
      </section>
    );
  }
}
