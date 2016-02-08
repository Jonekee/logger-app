import React, { Component, PropTypes } from 'react';
import {isLoaded, load as loadGroups} from '../../redux/modules/groups';
import connectData from '../../helpers/connectData';
import {connect} from 'react-redux';
import { AnalysisPage } from '../../components';

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
export default class Analysis extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired,
    logId: PropTypes.string.isRequired,
    groups: PropTypes.array.isRequired
  };

  render() {
    const { groupId, groups, logId } = this.props;
    const logData = groups[groupId].logs[logId].logData;
    const logLevelMapping = groups[groupId].logs[logId].logLevelMapping;
    return (
      <AnalysisPage groupId={groupId} logId={logId} logData={logData} logLevelMapping={logLevelMapping}/>
    );
  }
}
