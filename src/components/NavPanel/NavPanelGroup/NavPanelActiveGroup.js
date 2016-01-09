import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import NavPanelGroupItem from './NavPanelGroupItem/NavPanelGroupItem';
import Icon from '../../Icon/Icon';
import styles from './NavPanelGroup.scss';
import {connect} from 'react-redux';
import { toggleActiveNavGroupOpen } from 'redux/modules/groups';

@connect(
  state => ({ activeGroupOpen: state.groups.activeGroupOpen }),
  { toggleActiveNavGroupOpen })
export default class NavPanelActiveGroup extends Component {
  static propTypes = {
    activeGroupOpen: PropTypes.bool,
    activeLogs: PropTypes.array.isRequired,
    groups: PropTypes.array.isRequired,
    toggleActiveNavGroupOpen: PropTypes.func
  }

  componentDidUpdate() {
    console.log('NavPanelActiveGroup:cDU');
  }

  render() {
    const { activeGroupOpen, activeLogs, groups, toggleActiveNavGroupOpen } = this.props; // eslint-disable-line no-shadow
    const listContentsHeight = activeLogs.length * 28 || 19; // ##BADCODE Hard coded styling related value, the OR is for when the log list is empty and 'No logs' is shown
    const currHeight = (activeGroupOpen ? listContentsHeight : '0') + 'px';
    return (
      <section className={styles.navPanelGroup}>
        <header>
          <div>
            <Link to="/dashboard/active">
              <h3>Active Logs</h3>
            </Link>
          </div>
          <button onClick={toggleActiveNavGroupOpen.bind(null, 0)} className={activeGroupOpen ? '' : styles.closed}>
            <Icon iconName="chevron-down"/>
          </button>
        </header>
        <ul ref="list" style={{ height: currHeight }}>
          {activeLogs && activeLogs.length > 0
            ? activeLogs.map((log, index) => <NavPanelGroupItem key={index} groupId={log.groupId} logId={log.logId} log={groups[log.groupId].logs[log.logId]} isVisible={activeGroupOpen}/>)
            : (
              <li className={styles.noLogsLine}>No logs</li>
            )
          }
        </ul>
      </section>
    );
  }
}
