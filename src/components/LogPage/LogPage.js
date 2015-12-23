import React, { Component, PropTypes } from 'react';
import styles from './LogPage.scss';
import { Icon, DropDown } from 'components';
import ControlButton from './ControlButton/ControlButton';
import { connect } from 'react-redux';
import { toggleLogExtraActionsOpen } from 'redux/modules/groups';
import { Link } from 'react-router';

@connect(
  state => ({ route: state.router.routes }),
  { toggleLogExtraActionsOpen })
export default class LogPage extends Component {
  static propTypes = {
    groupId: PropTypes.string,
    logId: PropTypes.string,
    log: PropTypes.object,
    toggleLogExtraActionsOpen: PropTypes.func,
    children: PropTypes.object,
    route: PropTypes.array
  }

  render() {
    const { groupId, logId, log, toggleLogExtraActionsOpen, route } = this.props; // eslint-disable-line no-shadow

    // Detect which route is active
    const isOuputRoute = route[route.length - 1].path !== 'analysis';

    // Control buttons depending on log active state
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
          <div className={styles.row}>
            <h3>{log.fpath + log.fname}</h3>
            <div className={styles.rhs}>
              <button className={log.extraActionsOpen ? styles.toggle : styles.toggle + ' ' + styles.closed } onClick={toggleLogExtraActionsOpen.bind(null, groupId, logId)}>
                <span>{log.extraActionsOpen ? 'Hide' : 'Show'}</span>
                <Icon iconName="chevron-down"/>
              </button>
            </div>
          </div>
          <div className={styles.row} style={log.extraActionsOpen ? { maxHeight: '40px', paddingTop: '12px' } : {}}>
            <DropDown title="Syntax" options={[]} onChange={() => {}}/>
            <DropDown title="Filter" options={[]} onChange={() => {}}/>
          </div>
          <div className={styles.row}>
            <nav>
              <ul>
                <li>
                  <Link to={'/dashboard/group/' + groupId + '/log/' + logId + '/output'} className={isOuputRoute ? styles.active : ''}>Output</Link>
                </li>
                <li>
                  <Link to={'/dashboard/group/' + groupId + '/log/' + logId + '/analysis'} className={isOuputRoute ? '' : styles.active}>Analysis</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <section>
          {this.props.children}
        </section>
      </section>
    );
  }
}
