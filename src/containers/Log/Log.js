import React, { Component, PropTypes } from 'react';
import {isLoaded, load as loadGroups} from '../../redux/modules/groups';
import connectData from '../../helpers/connectData';
import {connect} from 'react-redux';
import { LogPage } from '../../components';

function fetchData(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadGroups());
  }
}

@connectData(fetchData)
@connect(
  state => ({
    groupId: state.router.params.groupId,
    groups: state.groups.data,
    logId: state.router.params.logId
  }))
export default class Log extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    groupId: PropTypes.string,
    logId: PropTypes.string,
    groups: PropTypes.array.isRequired
  };

  render() {
    const { groupId, groups, logId } = this.props;

    if (!groupId || !logId) {
      // This occurs when the user click onto another page and the route state changes before a page change actually occurs
      return null;
    }

    const log = groups[groupId].logs[logId];
    return (
      <LogPage groupId={groupId} logId={logId} log={log}>
        {this.props.children}
      </LogPage>
    );
  }
}
