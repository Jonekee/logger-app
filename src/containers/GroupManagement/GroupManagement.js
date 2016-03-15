import React, { Component, PropTypes } from 'react';
import {isLoaded, load as loadGroups, toggleEditGroupName, toggleDeleteGroup, updateUnsavedGroupName, saveGroupName, deleteGroup } from '../../redux/modules/groups';
import { setNewGroupName, toggleInputingNewGroup, createNewGroup } from '../../redux/modules/groupManagement';
import connectData from '../../helpers/connectData';
import {connect} from 'react-redux';
import { GroupManagementPage } from '../../components';

function fetchData(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadGroups());
  }
}

@connectData(fetchData)
@connect(
  state => ({
    groups: state.groups.data,
    newGroupControls: state.groupManagement
  }),
  { toggleEditGroupName, toggleDeleteGroup, updateUnsavedGroupName, saveGroupName, deleteGroup, setNewGroupName, toggleInputingNewGroup, createNewGroup })
export default class GroupManagement extends Component {
  static propTypes = {
    groups: PropTypes.array,
    newGroupControls: PropTypes.object.isRequired,
    toggleEditGroupName: PropTypes.func.isRequired,
    toggleDeleteGroup: PropTypes.func.isRequired,
    updateUnsavedGroupName: PropTypes.func.isRequired,
    saveGroupName: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    setNewGroupName: PropTypes.func.isRequired,
    toggleInputingNewGroup: PropTypes.func.isRequired,
    createNewGroup: PropTypes.func.isRequired
  };

  render() {
    const { groups } = this.props;
    return !!groups ? <GroupManagementPage {...this.props} /> : null;
  }
}
