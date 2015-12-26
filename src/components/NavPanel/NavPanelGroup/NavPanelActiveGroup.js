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

  constructor() {
    super();
    this.state = {
      listHeight: -1
    };
  }

  componentDidMount() {
    this.updateListHeight();
  }

  componentDidUpdate() {
    this.updateListHeight();
  }

  updateListHeight = () => {
    // Only run this on the client WHEN the CSS has loaded, having to detect the padding to know this :(
    if (__CLIENT__) {
      if (!!this.refs.list && this.props.activeLogs.length && (window.getComputedStyle(this.refs.list.firstElementChild.firstElementChild).padding !== '0px')) {
        // Have to convert list.children from HTMLCollection to a normal Array so that we can .reduce it
        const listContentsHeight = [].slice.call(this.refs.list.children).reduce((sum, listItem) => (sum + listItem.offsetHeight), 0);
        if (this.state.listHeight !== listContentsHeight) {
          this.setState({
            listHeight: listContentsHeight
          });
        }
      } else {
        // Delay measurement
        setTimeout(this.updateListHeight, 100);
      }
    }
  }

  render() {
    const { activeGroupOpen, activeLogs, groups, toggleActiveNavGroupOpen } = this.props; // eslint-disable-line no-shadow
    // const toggle = group.navOpen ? toggleNavGroupOpen.bind(null, groupName) : toggleNavGroupOpen.bind(null, groupName);
    const useAutoHeight = (this.state.listHeight === -1);
    const dynHeight = (activeGroupOpen ? this.state.listHeight : '0') + 'px';
    const currHeight = useAutoHeight ? 'auto' : dynHeight;
    return (
      <section className={styles.navPanelGroup}>
        <header>
          <div>
            <Link to="/dashboard/activelogs">
              <h3>Active Logs</h3>
            </Link>
          </div>
          <button onClick={toggleActiveNavGroupOpen.bind(null, 0)} className={activeGroupOpen ? '' : styles.closed}>
            <Icon iconName="chevron-down"/>
          </button>
        </header>
        <ul ref="list" style={{ height: currHeight }}>
          {activeLogs && activeLogs.map((log, index) => <NavPanelGroupItem key={index} groupId={log.groupId} logId={log.logId} log={groups[log.groupId].logs[log.logId]}/>) }
        </ul>
      </section>
    );
  }
}
