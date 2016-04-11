import React, { Component, PropTypes } from 'react';
import styles from './LogPageHeader.scss';
import { ControlButton, Icon, DropDown } from '../../components';
import { connect } from 'react-redux';
import { toggleLogExtraActionsOpen, activateLog, pauseLog, resumeLog, deactivateLog, clearLogOutput, toggleScrollLock } from '../../redux/modules/logs';
import { Link } from 'react-router';
import { releaseStage } from '../../config';

@connect(
  null,
  { toggleLogExtraActionsOpen, activateLog, pauseLog, resumeLog, deactivateLog, clearLogOutput, toggleScrollLock })
export default class LogPageHeader extends Component {
  static propTypes = {
    logId: PropTypes.string.isRequired,
    log: PropTypes.object.isRequired,
    toggleLogExtraActionsOpen: PropTypes.func.isRequired,
    activateLog: PropTypes.func.isRequired,
    pauseLog: PropTypes.func.isRequired,
    resumeLog: PropTypes.func.isRequired,
    deactivateLog: PropTypes.func.isRequired,
    clearLogOutput: PropTypes.func.isRequired,
    toggleScrollLock: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    /*  Component should only update when IDs, name, file name, file path,
     *  activeState or extraActionsOpen change.
     */
    return this.props.logId !== nextProps.logId
      || this.props.log.name !== nextProps.log.name
      || this.props.log.fpath !== nextProps.log.fpath
      || this.props.log.fname !== nextProps.log.fname
      || this.props.log.activeState !== nextProps.log.activeState
      || this.props.log.extraActionsOpen !== nextProps.log.extraActionsOpen
      || this.props.log.scrollLocked !== nextProps.log.scrollLocked;
  }

  componentDidUpdate() {
    console.log('LogPageHeader:cDU');
  }

  triggerActivateLog = () => {
    const { logId, activateLog } = this.props; // eslint-disable-line no-shadow
    activateLog(logId);
    socket.emit('attachLogListener', { logId });
  };

  triggerDeactivateLog = () => {
    const { logId, deactivateLog } = this.props; // eslint-disable-line no-shadow
    deactivateLog(logId);
    socket.emit('detachLogListener', { logId });
  };

  triggerPauseLog = () => {
    const { logId, pauseLog } = this.props; // eslint-disable-line no-shadow
    pauseLog(logId);
  };

  triggerResumeLog = () => {
    const { logId, resumeLog } = this.props; // eslint-disable-line no-shadow
    resumeLog(logId);
  };

  clearLogOutput = () => {
    const { logId, clearLogOutput } = this.props; // eslint-disable-line no-shadow
    clearLogOutput(logId);
  };

  toggleScrollLock = () => {
    const { logId, toggleScrollLock } = this.props; // eslint-disable-line no-shadow
    toggleScrollLock(logId);
  };

  render() {
    const { logId, log, toggleLogExtraActionsOpen } = this.props; // eslint-disable-line no-shadow

    // Control buttons depending on log active state
    let headerActions;
    switch (log.activeState) {
      case 'ACTIVE' :
        headerActions = [
          <ControlButton key={0} iconName="pause" text="Pause watching" color="warning" onClick={this.triggerPauseLog}/>,
          <ControlButton key={1} iconName="stop" text="Stop watching" color="negative" onClick={this.triggerDeactivateLog}/>
        ];
        break;
      case 'PAUSED' :
        headerActions = [
          <ControlButton key={0} iconName="play" text="Resume watching" color="positive" onClick={this.triggerResumeLog}/>,
          <ControlButton key={1} iconName="stop" text="Stop watching" color="negative" onClick={this.triggerDeactivateLog}/>
        ];
        break;
      case 'INACTIVE' :
        // Use default
      case 'INACTIVE_WITH_OUTPUT' :
        // Use default
      default:
        headerActions = [
          <ControlButton key={0} iconName="play" text="Start watching" color="positive" onClick={this.triggerActivateLog}/>,
          <ControlButton key={1} iconName="delete" text="Clear output" color="negative" onClick={this.clearLogOutput}/>
        ];
        break;
    }

    return (
      <header className={styles.logPageHeader}>
        <div className={styles.row}>
          <h2>{log.name}</h2>
          <div className={styles.rhs}>
            {headerActions}
            <ControlButton iconName={log.scrollLocked ? 'lock-open' : 'lock'} text={(log.scrollLocked ? 'Unl' : 'L') + 'ock scrolling'} color="neutral" onClick={this.toggleScrollLock}/>
          </div>
        </div>
        <div className={styles.row + (releaseStage < 3 ? ' ' + styles.earlyReleaseStyle : '')}>
          <h3>{log.fpath + log.fname}</h3>
          {releaseStage > 2
            ? (
              <div className={styles.rhs}>
                <button className={log.extraActionsOpen ? styles.toggle : styles.toggle + ' ' + styles.closed } onClick={toggleLogExtraActionsOpen.bind(null, logId)}>
                  <span>{log.extraActionsOpen ? 'Hide' : 'Show'}</span>
                  <Icon iconName="chevron-down"/>
                </button>
              </div>
            )
            : null
          }
        </div>
        {releaseStage > 2
          ? [
            <div className={styles.row} style={log.extraActionsOpen ? { maxHeight: '40px', paddingTop: '12px' } : {}}>
              <DropDown title="Syntax" options={[]} onChange={() => {}}/>
              <DropDown title="Filter" options={[]} onChange={() => {}}/>
            </div>,
            <div className={styles.row}>
              <nav>
                <ul>
                  <li>
                    <Link to={'/dashboard/log/' + logId + '/output'}>Output</Link>
                  </li>
                  <li>
                    <Link to={'/dashboard/log/' + logId + '/analysis'}>Analysis</Link>
                  </li>
                </ul>
              </nav>
            </div>
          ]
          : null
        }
      </header>
    );
  }
}
