import React, { Component, PropTypes } from 'react';
import {isLoaded, load as loadGroups} from '../../redux/modules/groups';
import connectData from '../../helpers/connectData';
import {connect} from 'react-redux';
import { LogOutputPage } from '../../components';

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
    groupId: PropTypes.string, // These can't be required because they are removed from the sate before a page changes
    logId: PropTypes.string, // These can't be required because they are removed from the sate before a page changes
    groups: PropTypes.array.isRequired
  };

  render() {
    const { groupId, groups, logId } = this.props;

    if (!groupId || !logId) {
      // This occurs when the user click onto another page and the route state changes before a page change actually occurs
      return null;
    }

    const logData = groups[groupId].logs[logId].logData;
    const scrollLocked = groups[groupId].logs[logId].scrollLocked;
    return (
      <LogOutputPage groupId={groupId} logId={logId} logData={logData} scrollLocked={scrollLocked}/>
    );
  }
}
