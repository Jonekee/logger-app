import React, { Component, PropTypes } from 'react';
import {isLoaded, load as loadGroups} from 'redux/modules/groups';
import connectData from 'helpers/connectData';
import {connect} from 'react-redux';
import { LogOutputPage } from 'components';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadGroups());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    groupId: state.router.params.groupId,
    groups: state.groups.data,
    logId: state.router.params.logId
  }))
export default class LogOutput extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired,
    logId: PropTypes.string.isRequired,
    groups: PropTypes.array.isRequired
  };

  render() {
    const { groupId, groups, logId } = this.props;
    const logData = groups[groupId].logs[logId].logData;
    return (
      <LogOutputPage groupId={groupId} logId={logId} logData={logData}/>
    );
  }
}
