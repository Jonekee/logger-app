import React, { Component, PropTypes } from 'react';
import { toggleEditNameOpen, toggleDeleteGroupOpen, setEditedName, saveGroupName, deleteGroup } from '../../redux/modules/groups';
import { setNewGroupName, toggleInputingNewGroup, createNewGroup } from '../../redux/modules/groupManagement';
import { connect } from 'react-redux';
import { GroupManagementPage } from '../../components';

@connect(
  state => ({
    groups: state.groups.data,
    newGroupControls: state.groupManagement
  }),
  { toggleEditNameOpen, toggleDeleteGroupOpen, setEditedName, saveGroupName, deleteGroup, setNewGroupName, toggleInputingNewGroup, createNewGroup })
export default class GroupManagement extends Component {
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

  render() {
    return <GroupManagementPage {...this.props} />;
  }
}
