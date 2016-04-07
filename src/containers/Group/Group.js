import React, { Component, PropTypes } from 'react';
import { isLoaded, setGroupListFilter, load as loadGroups } from '../../redux/modules/groupz';
import connectData from '../../helpers/connectData';
import {connect} from 'react-redux';
import { GroupPage, GroupNotFoundPage } from '../../components';

function fetchData(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadGroups());
  }
}

@connectData(fetchData)
@connect(
  state => ({
    groupId: state.router.params.groupId,
    group: state.groupz.data[state.router.params.groupId]
  }),
  { setGroupListFilter })
export default class Group extends Component {
  static propTypes = {
    groupId: PropTypes.string,
    group: PropTypes.object,
    setGroupListFilter: PropTypes.func.isRequired
  };

  render() {
    return !!this.props.group ? <GroupPage {...this.props}/> : <GroupNotFoundPage groupId={this.props.groupId}/>;
  }
}
