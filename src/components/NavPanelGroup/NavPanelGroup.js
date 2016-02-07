import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { NavPanelGroupItem, Icon } from '../../components';
import styles from './NavPanelGroup.scss';

export default class NavPanelGroup extends Component {
  static propTypes = {
    groupId: PropTypes.number.isRequired,
    groupName: PropTypes.string.isRequired,
    groupNavOpen: PropTypes.bool.isRequired,
    toggleNavOpen: PropTypes.func.isRequired,
    logs: PropTypes.array.isRequired
  };

  shouldComponentUpdate(nextProps) {
    /*  This component should only update if the IDs, name, activeState or
     *  isVisisble values change.
     *
     *  This is actually a lot more elegant than it may seem as if say the
     *  group name is the change, the later comparisons won't actually be made.
     */
    return this.props.groupId !== nextProps.groupId
      || this.props.groupName !== nextProps.groupName
      || this.props.groupNavOpen !== nextProps.groupNavOpen
      || this.props.logs.length !== nextProps.logs.length
      || this.props.logs.reduce((prevValue, currLog, index) => {
        const nextLog = nextProps.logs[index];
        return prevValue
          || currLog.logId !== nextLog.logId
          || currLog.groupId !== nextLog.groupId
          || currLog.logName !== nextLog.logName
          || currLog.logStatus !== nextLog.logStatus
          || currLog.logHasNew !== nextLog.logHasNew;
      }, false);
  }

  componentDidUpdate() {
    console.log('NavPanelGroup:cDU - ' + this.props.groupName);
  }

  render() {
    const { groupId, groupName, groupNavOpen, toggleNavOpen, logs } = this.props; // eslint-disable-line no-shadow
    const listContentsHeight = logs.length * 28 || 19; // ##BADCODE Hard coded styling related value, the OR is for when the log list is empty and 'No logs' is shown
    const currHeight = (groupNavOpen ? listContentsHeight : '0') + 'px';
    return (
      <section className={styles.navPanelGroup}>
        <header>
          <div>
            <Link to={groupId === -1 ? '/dashboard/active' : '/dashboard/group/' + groupId}>
              <h3>{groupName}</h3>
            </Link>
          </div>
          <button onClick={toggleNavOpen} className={groupNavOpen ? '' : styles.closed}>
            <Icon iconName="chevron-down"/>
          </button>
        </header>
        <ul ref="list" style={{ height: currHeight }}>
          {logs.length > 0
            ? logs.map((log, index) => <NavPanelGroupItem key={index} {...log} isVisible={groupNavOpen}/>)
            : (
              <li className={styles.noLogsLine}>No logs</li>
            )
          }
        </ul>
      </section>
    );
  }
}
