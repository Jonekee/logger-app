import React, { Component, PropTypes } from 'react';
import styles from './GroupManagementPage.scss';
import Helmet from 'react-helmet';

export default class GroupManagementPage extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired
  };

  shouldComponentUpdate(nextProps) {
    /*  GroupManagementPage should only update if it is being passed a groups
     *  array which has changed any of the actual data rendered, i.e. group
     *  name, id (for link), amount of logs...
     */
    const currGroups = this.props.groups;
    const newGroups = nextProps.groups;

    // Check if any groups have been added or removed
    if (currGroups.length !== newGroups.length) {
      return true;
    }

    // Check if any groups names have been changed
    newGroups.forEach((newGroup, index) => {
      if (newGroup.name !== currGroups[index].name) {
        return true;
      }
    });

    return false;
  }

  componentDidUpdate() {
    console.log('GroupManagementPage:cDU');
  }

  render() {
    const { groups } = this.props;
    return (
      <section className={styles.groupManagementPage}>
        <Helmet title="Admin - Groups"/>
        <header>
          <h2>Groups Management</h2>
        </header>
        <section>
          {/* This page should provide general CRUD functionality, create new group, see all groups, edit group name, delete group */}
          <ul>
            {groups.map((group, index) => <li key={index}>{group.name}</li>)}
          </ul>
        </section>
      </section>
    );
  }
}
