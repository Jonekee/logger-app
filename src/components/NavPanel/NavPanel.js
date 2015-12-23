import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import NavPanelGroup from './NavPanelGroup/NavPanelGroup';
import Icon from '../Icon/Icon';
import './NavPanel.scss';

export default class NavPanel extends Component {
  static propTypes = {
    groups: PropTypes.array
  }

  render() {
    const { groups } = this.props;
    return (
      <aside>
        <div>
          <Link to="dashboard">
            <h1>Logger</h1>
          </Link>
        </div>
        <nav>
          <div>
            {groups && groups.map((group, index) => <NavPanelGroup key={index} groupId={index} group={group}/>)}
          </div>
          <div>
            <ul>
              <li>
                <Link to="widgets">
                  <Icon iconName="key-variant"/>
                  <span>Admin Controls</span>
                </Link>
              </li>
              <li>
                <Link to="about">
                  <Icon iconName="settings"/>
                  <span>User Settings</span>
                </Link>
              </li>
              <li>
                <Link to="wdigets">
                  <Icon iconName="account"/>
                  <span>Sign Out</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    );
  }
}
