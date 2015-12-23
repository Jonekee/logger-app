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
      if (!!this.refs.list && (window.getComputedStyle(this.refs.list.firstElementChild.firstElementChild).padding !== '0px')) {
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
    const { groupId, group, toggleNavGroupOpen } = this.props; // eslint-disable-line no-shadow
    // const toggle = group.navOpen ? toggleNavGroupOpen.bind(null, groupName) : toggleNavGroupOpen.bind(null, groupName);
    const useAutoHeight = (this.state.listHeight === -1);
    const dynHeight = (group.navOpen ? this.state.listHeight : '0') + 'px';
    const currHeight = useAutoHeight ? 'auto' : dynHeight;
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
          { group.logs.map((log, index) => <NavPanelGroupItem key={index} groupId={groupId} logId={index} log={log}/>) }
        </ul>
      </section>
    );
  }
}
