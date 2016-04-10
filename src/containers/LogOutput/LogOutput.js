import React, { Component, PropTypes } from 'react';
import { isLoaded, load as loadLogs } from '../../redux/modules/logz';
import connectData from '../../helpers/connectData';
import {connect} from 'react-redux';
import { LogOutputPage } from '../../components';

function fetchData(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadLogs());
  }
}

@connectData(fetchData)
@connect(
  state => ({
    log: state.logz.data[state.router.params.logId],
    logId: state.router.params.logId
  }))
export default class LogOutput extends Component {
  static propTypes = {
    log: PropTypes.object.isRequired,
    logId: PropTypes.string.isRequired
  };

  render() {
    const { log, logId } = this.props;

    return <LogOutputPage logId={logId} logData={log.logData} scrollLocked={log.scrollLocked}/>;
  }
}
