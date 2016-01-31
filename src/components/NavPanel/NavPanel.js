import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import NavPanelGroup from './NavPanelGroup/NavPanelGroup';
import NavPanelActiveGroup from './NavPanelGroup/NavPanelActiveGroup';
import Icon from '../Icon/Icon';
import './NavPanel.scss';
import { releaseStage } from '../../config';

export default class NavPanel extends Component {
  static propTypes = {
    authEnabled: PropTypes.bool,
    groups: PropTypes.array
  };

  componentDidUpdate() {
    console.log('NavPanel:cDU');
  }

  render() {
    const { authEnabled, groups } = this.props;
    const activeLogs = [];
    if (groups) {
      groups.forEach((group, groupId) => {
        group.logs.forEach((log, logId) => {
          if (log.activeState !== 'INACTIVE') {
            activeLogs.push({
              groupId,
              logId
            });
          }
        });
      });
    }

    activeLogs.sort((first, second) => {
      const firstName = groups[first.groupId].logs[first.logId].name;
      const secondName = groups[second.groupId].logs[second.logId].name;
      return firstName > secondName;
    });

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
              <NavPanelActiveGroup activeLogs={activeLogs} groups={groups}/>
              {groups && groups.map((group, index) => <NavPanelGroup key={index} groupId={index} group={group}/>)}
            </div>
          </div>
          {releaseStage > 0
            ? (
              <div>
                <ul>
                  <li>
                    <Link to="/dashboard/admin">
                      <Icon iconName="key-variant"/>
                      <span>Admin Settings</span>
                    </Link>
                  </li>
                  {
                    authEnabled
                    ? [
                      <li>
                        <Link to="about">
                          <Icon iconName="settings"/>
                          <span>User Settings</span>
                        </Link>
                      </li>,
                      <li>
                        <Link to="wdigets">
                          <Icon iconName="account"/>
                          <span>Sign Out</span>
                        </Link>
                      </li>
                    ]
                    : null
                  }
                </ul>
              </div>
            )
            : null
          }
        </nav>
      </aside>
    );
  }
}
