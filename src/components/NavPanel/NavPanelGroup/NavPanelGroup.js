import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import NavPanelGroupItem from './NavPanelGroupItem/NavPanelGroupItem';
import Icon from '../../Icon/Icon';
import styles from './NavPanelGroup.scss';
import {connect} from 'react-redux';
import { toggleNavGroupOpen } from 'redux/modules/groups';

@connect(
  null,
  {toggleNavGroupOpen})
export default class NavPanelGroup extends Component {
  static propTypes = {
    groupId: PropTypes.number.isRequired,
    group: PropTypes.object.isRequired,
    toggleNavGroupOpen: PropTypes.func.isRequired
  }

  render() {
    const { groupId, group, toggleNavGroupOpen } = this.props; // eslint-disable-line no-shadow
    const listContentsHeight = group.logs.length * 28 || 19; // ##BADCODE Hard coded styling related value, the OR is for when the log list is empty and 'No logs' is shown
    const currHeight = (group.navOpen ? listContentsHeight : '0') + 'px';
    return (
      <section className={styles.navPanelGroup}>
        <header>
          <div>
            <Link to={'/dashboard/group/' + groupId}>
              <h3>{group.name}</h3>
            </Link>
          </div>
          <button onClick={toggleNavGroupOpen.bind(null, groupId)} className={group.navOpen ? '' : styles.closed}>
            <Icon iconName="chevron-down"/>
          </button>
        </header>
        <ul ref="list" style={{ height: currHeight }}>
          {group.logs.length > 0
            ? group.logs.map((log, index) => <NavPanelGroupItem key={index} groupId={groupId} logId={index} log={log} isVisible={group.navOpen}/>)
            : (
              <li className={styles.noLogsLine}>No logs</li>
            )
          }
        </ul>
      </section>
    );
  }
}
