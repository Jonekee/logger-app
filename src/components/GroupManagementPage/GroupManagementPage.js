import React, { Component, PropTypes } from 'react';
import styles from './GroupManagementPage.scss';
import Helmet from 'react-helmet';
import { Icon } from '../../components';

export default class GroupManagementPage extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    toggleEditGroupName: PropTypes.func.isRequired,
    toggleDeleteGroup: PropTypes.func.isRequired
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
    console.log('scu');
    let shouldUpdate = false;
    newGroups.forEach((newGroup, index) => {
      if (newGroup.name !== currGroups[index].name
        || newGroup.adminPageEditing !== currGroups[index].adminPageEditing
        || newGroup.adminPageDeleting !== currGroups[index].adminPageDeleting) {
        console.log('yep');
        shouldUpdate = true;
      }
    });

    return shouldUpdate;
  }

  componentDidUpdate() {
    console.log('GroupManagementPage:cDU');
  }

  render() {
    const { groups, toggleEditGroupName, toggleDeleteGroup } = this.props;
    console.log('rendy');
    return (
      <section className={styles.groupManagementPage}>
        <Helmet title="Admin - Groups"/>
        <header>
          <h2>Groups Management</h2>
        </header>
        <section>
          {/* This page should provide general CRUD functionality, create new group, see all groups, edit group name, delete group */}
          <ul>
            <li className={styles.newGroupItem}>
              <button>
                <Icon iconName="plus"/>
                <p>New Group</p>
              </button>
            </li>
            {groups.map((group, index) => <li key={index} className={styles.groupItem}>
              <div className={styles.basePanel}>
                <div className={styles.info}>
                  <p>{group.name}</p>
                  <p>{group.logs.length} Log{group.logs.length !== 1 ? 's' : ''}</p>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => toggleEditGroupName(index)}>
                    <Icon iconName="pencil"/>
                  </button>
                  <button onClick={() => toggleDeleteGroup(index)}>
                    <Icon iconName="delete"/>
                  </button>
                </div>
              </div>
              <div className={styles.editNamePanel + (group.adminPageEditing ? ' ' + styles.open : '')}>
                <div className={styles.info}>
                  <input type="text" value={group.adminPageNewName} />
                </div>
                <div className={styles.actions}>
                  <button>
                    <Icon iconName="check"/>
                  </button>
                  <button onClick={() => toggleEditGroupName(index)}>
                    <Icon iconName="close"/>
                  </button>
                </div>
              </div>
            </li>)}
          </ul>
        </section>
      </section>
    );
  }
}
