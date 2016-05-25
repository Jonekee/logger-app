import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import { Icon, NavPanelGroup } from '../../components';
import styles from './NavPanel.scss';
import {connect} from 'react-redux';
import { toggleActiveNavGroupOpen } from '../../redux/modules/appInterface';
import { toggleNavGroupOpen } from '../../redux/modules/groups';

@connect(
  state => ({
    activeGroupOpen: state.appInterface.activeGroupNavOpen
  }),
  { toggleActiveNavGroupOpen, toggleNavGroupOpen })
export default class NavPanel extends Component {
  static propTypes = {
    authEnabled: PropTypes.bool,
    activeGroupOpen: PropTypes.bool,
    toggleNavGroupOpen: PropTypes.func,
    toggleActiveNavGroupOpen: PropTypes.func,
    groups: PropTypes.object.isRequired,
    logs: PropTypes.object.isRequired
  };

  componentDidUpdate() {
    console.log('NavPanel:cDU');
  }

  toggleNavGroupOpen(groupId) {
    const { toggleNavGroupOpen, toggleActiveNavGroupOpen } = this.props; // eslint-disable-line
    if (!groupId) {
      // Is active group, use different function
      toggleActiveNavGroupOpen();
    } else {
      toggleNavGroupOpen(groupId);
    }
  }

  render() {
    const { authEnabled, activeGroupOpen, groups, logs } = this.props;

    /* Normalise both normal and active groups to format:
    {
      groupId,
      groupName,
      groupNavOpen,
      logs : [
        {
          logId,
          groupId,
          logName,
          logStatus,
          logHasNew
        }
      ]
    }
    */

    const navGroups = [];
    const activeLogs = [];

    Object.keys(groups).forEach((groupId) => {
      const group = groups[groupId];
      const groupLogs = [];

      group.logs.forEach((logId) => {
        const log = logs[logId];

        // Add log to group list
        groupLogs.push({
          logId,
          logName: log.name,
          logStatus: log.activeState,
          logHasNew: log.hasNew
        });

        // Add log to active list if isn't inactive
        if (log.activeState !== 'INACTIVE') {
          activeLogs.push({
            logId,
            logName: log.name,
            logStatus: log.activeState,
            logHasNew: log.hasNew
          });
        }
      });

      groupLogs.sort((first, second) => first.logName.localeCompare(second.logName));

      navGroups.push({
        groupId,
        logs: groupLogs,
        groupName: group.name,
        groupNavOpen: group.navOpen
      });
    });

    // Sort groups based on name
    navGroups.sort((first, second) => first.groupName.localeCompare(second.groupName));

    // Sort active logs and push to start of list
    activeLogs.sort((first, second) => first.logName.localeCompare(second.logName));
    navGroups.unshift({
      groupName: 'Active Group',
      groupNavOpen: activeGroupOpen,
      logs: activeLogs
    });

    return (
      <aside>
        <div className={styles.logo}>
          <Link to="/dashboard">
            <Icon iconName="logger-logo" viewBox="0 0 123.1 34"/>
          </Link>
        </div>
        <nav>
          <div>
            <div>
              {navGroups.map((group, index) => (
                <NavPanelGroup key={index} groupId={group.groupId} groupName={group.groupName} groupNavOpen={group.groupNavOpen} logs={group.logs} toggleNavOpen={this.toggleNavGroupOpen.bind(this, group.groupId)}/>
              ))}
            </div>
          </div>
          <div>
            <ul>
              <li>
                <Link to="/dashboard/settings">
                  <Icon iconName="settings"/>
                  <span>Settings</span>
                </Link>
              </li>
              {
                authEnabled
                ? [
                  <li>
                    <Link to="about">
                      <Icon iconName="account"/>
                      <span>Your Account</span>
                    </Link>
                  </li>,
                  <li>
                    <Link to="logout">
                      <Icon iconName="logout"/>
                      <span>Sign Out</span>
                    </Link>
                  </li>
                ]
                : null
              }
            </ul>
          </div>
        </nav>
      </aside>
    );
  }
}
