import React, { Component, PropTypes } from 'react';
import styles from './GroupManagementPage.scss';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import { Icon, LoadingSpinner } from '../../components';

export default class GroupManagementPage extends Component {
  static propTypes = {
    groups: PropTypes.object.isRequired,
    newGroupControls: PropTypes.object.isRequired,
    toggleEditNameOpen: PropTypes.func.isRequired,
    toggleDeleteGroupOpen: PropTypes.func.isRequired,
    setEditedName: PropTypes.func.isRequired,
    saveGroupName: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    setNewGroupName: PropTypes.func.isRequired,
    toggleInputingNewGroup: PropTypes.func.isRequired,
    createNewGroup: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    let shouldUpdate = false;
    /*  GroupManagementPage should only update if it is being passed a groups
     *  array which has changed any of the actual data rendered, i.e. group
     *  name, id (for link), amount of logs...
     */
    const currGroups = this.props.groups;
    const newGroups = nextProps.groups;

    // Check if any groups have been added or removed
    if (Object.keys(currGroups).length !== Object.keys(newGroups).length) {
      shouldUpdate = true;
    }


    const currGroupControls = this.props.newGroupControls;
    const nextGroupControls = nextProps.newGroupControls;
    if (currGroupControls.inputingNewGroup !== nextGroupControls.inputingNewGroup
      || currGroupControls.newGroupName !== nextGroupControls.newGroupName
      || currGroupControls.savingNewGroup !== nextGroupControls.savingNewGroup) {
      shouldUpdate = true;
    }

    // Check if any groups names have been changed
    Object.keys(newGroups).forEach(newGroupId => {
      const newGroup = newGroups[newGroupId];
      if (!currGroups[newGroupId]
        || newGroup.name !== currGroups[newGroupId].name
        || newGroup.editNameOpen !== currGroups[newGroupId].editNameOpen
        || newGroup.editedName !== currGroups[newGroupId].editedName
        || newGroup.editedNameHasError !== currGroups[newGroupId].editedNameHasError
        || newGroup.editSaving !== currGroups[newGroupId].editSaving
        || newGroup.deleteGroupOpen !== currGroups[newGroupId].deleteGroupOpen
        || newGroup.deleteSaving !== currGroups[newGroupId].deleteSaving) {
        shouldUpdate = true;
      }
    });

    return shouldUpdate;
  }

  componentDidUpdate() {
    console.log('GroupManagementPage:cDU');
  }

  render() {
    const { groups, newGroupControls, toggleEditNameOpen, toggleDeleteGroupOpen, setEditedName, saveGroupName, deleteGroup, setNewGroupName, toggleInputingNewGroup, createNewGroup } = this.props;

    const groupIdsAlphabetically = Object.keys(groups)
      .map(groupId => ({ groupId, name: groups[groupId].name }))
      .sort((first, second) => (first.name > second.name))
      .map(obj => obj.groupId);

    return (
      <section className={styles.groupManagementPage}>
        <Helmet title="Admin - Groups"/>
        <header>
          <h2>Group Management</h2>
        </header>
        <section>
          {/* This page should provide general CRUD functionality, create new group, see all groups, edit group name, delete group */}
          <ul>
            <li className={styles.newGroupItem}>
              <button onClick={() => toggleInputingNewGroup()}>
                <Icon iconName="plus"/>
                <p>New Group</p>
              </button>
              <div className={classnames(styles.editNamePanel, styles.fadeInPanel, { [styles.open]: newGroupControls.inputingNewGroup })}>
                <div className={styles.lhs}>
                  <form onSubmit={(event) => { createNewGroup(newGroupControls.newGroupName); event.preventDefault(); return false; }}>
                    <input type="text" placeholder="New group name" maxLength="15" className={classnames({ [styles.invalid]: newGroupControls.errorSavingNewGroup })} value={newGroupControls.newGroupName} onChange={(event) => setNewGroupName(event.target.value)} />
                  </form>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => createNewGroup(newGroupControls.newGroupName)}>
                    <Icon iconName="check"/>
                  </button>
                  <button onClick={() => toggleInputingNewGroup()}>
                    <Icon iconName="close"/>
                  </button>
                </div>
              </div>
              <div className={classnames(styles.savingPanel, styles.fadeInPanel, { [styles.open]: newGroupControls.savingNewGroup })}>
                <LoadingSpinner size={24} strokeWidth={1}/>
                <p>Creating...</p>
              </div>
            </li>
            {groupIdsAlphabetically.map(groupId => <li key={groupId} className={styles.groupItem}>
              <div className={styles.basePanel}>
                <div className={styles.lhs}>
                  <p>{groups[groupId].name}</p>
                  <p>{groups[groupId].logs.length} Log{groups[groupId].logs.length !== 1 ? 's' : ''}</p>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => toggleEditNameOpen(groupId)}>
                    <Icon iconName="pencil"/>
                  </button>
                  <button onClick={() => toggleDeleteGroupOpen(groupId)}>
                    <Icon iconName="delete"/>
                  </button>
                </div>
              </div>
              <div className={classnames(styles.editNamePanel, styles.fadeInPanel, { [styles.open]: groups[groupId].editNameOpen })}>
                <div className={styles.lhs}>
                  <form onSubmit={(event) => { saveGroupName(groupId, groups[groupId].editedName, groups[groupId].name); event.preventDefault(); return false; }}>
                    <input type="text" placeholder="Group name" maxLength="15" className={classnames({ [styles.invalid]: groups[groupId].editedNameHasError })} value={groups[groupId].editedName} onChange={(event) => setEditedName(groupId, event.target.value)}/>
                  </form>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => saveGroupName(groupId, groups[groupId].editedName, groups[groupId].name)}>
                    <Icon iconName="check"/>
                  </button>
                  <button onClick={() => toggleEditNameOpen(groupId)}>
                    <Icon iconName="close"/>
                  </button>
                </div>
              </div>
              <div className={classnames(styles.savingPanel, styles.fadeInPanel, { [styles.open]: groups[groupId].editSaving })}>
                <LoadingSpinner size={24} strokeWidth={1}/>
                <p>Saving...</p>
              </div>
              <div className={classnames(styles.deleteCheckPanel, styles.fadeInPanel, { [styles.open]: groups[groupId].deleteGroupOpen })}>
                <div className={styles.lhs}>
                  <p>Are you sure you want to delete group: "{groups[groupId].name}"</p>
                  <p>Deleting a group will remove all of its logs!</p>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => deleteGroup(groupId, groups[groupId].name)}>
                    <Icon iconName="check"/>
                  </button>
                  <button onClick={() => toggleDeleteGroupOpen(groupId)}>
                    <Icon iconName="close"/>
                  </button>
                </div>
              </div>
              <div className={classnames(styles.deletingPanel, styles.fadeInPanel, { [styles.open]: groups[groupId].deleteSaving })}>
                <LoadingSpinner size={24} strokeWidth={1}/>
                <p>Deleting...</p>
              </div>
            </li>)}
          </ul>
        </section>
      </section>
    );
  }
}
