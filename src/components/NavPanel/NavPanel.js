import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import { Icon, NavPanelGroup } from '../../components';
import './NavPanel.scss';
import {connect} from 'react-redux';
import { toggleActiveNavGroupOpen, toggleNavGroupOpen } from '../../redux/modules/groups';

@connect(
  state => ({ activeGroupOpen: state.groups.activeGroupOpen }),
  { toggleActiveNavGroupOpen, toggleNavGroupOpen })
export default class NavPanel extends Component {
  static propTypes = {
    authEnabled: PropTypes.bool,
    groups: PropTypes.array,
    activeGroupOpen: PropTypes.bool,
    toggleNavGroupOpen: PropTypes.func,
    toggleActiveNavGroupOpen: PropTypes.func
  };

  componentDidUpdate() {
    console.log('NavPanel:cDU');
  }

  toggleNavGroupOpen(groupId) {
    const { toggleNavGroupOpen, toggleActiveNavGroupOpen } = this.props; // eslint-disable-line
    if (groupId === -1) {
      // Is active group, use different function
      toggleActiveNavGroupOpen();
    } else {
      toggleNavGroupOpen(groupId);
    }
  }

  render() {
    const { authEnabled, groups, activeGroupOpen } = this.props;

    const activeLogs = [];
    if (groups) {
      groups.forEach((group, groupId) => {
        group.logs.forEach((log, logId) => {
          if (log.activeState !== 'INACTIVE') {
            activeLogs.push({
              logId,
              groupId,
              logName: log.name,
              logStatus: log.activeState,
              logHasNew: log.hasNew
            });
          }
        });
      });
    }

    activeLogs.sort((first, second) => {
      const firstName = first.logName;
      const secondName = second.logName;
      return firstName > secondName;
    });

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

    navGroups.push({
      groupId: -1,
      groupName: 'Active Group',
      groupNavOpen: activeGroupOpen,
      logs: activeLogs
    });

    if (groups) {
      groups.forEach((group, groupId) => {
        navGroups.push({
          groupId,
          groupName: group.name,
          groupNavOpen: group.navOpen,
          logs: group.logs.map((log, logId) => ({
            logId,
            groupId,
            logName: log.name,
            logStatus: log.activeState,
            logHasNew: log.hasNew
          }))
        });
      });
    }

    return (
      <aside>
        <div>
          <Link to="/dashboard">
            <h1>Logger</h1>
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
