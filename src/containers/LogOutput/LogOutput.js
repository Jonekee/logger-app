import React, { Component, PropTypes } from 'react';
import { isLoaded, load as loadLogs } from '../../redux/modules/logs';
import connectData from '../../helpers/connectData';
import { connect } from 'react-redux';
import { LogOutputPage } from '../../components';

function fetchData(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadLogs());
  }
}

@connectData(fetchData)
@connect(
  state => ({
    log: state.logs.data[state.router.params.logId],
    logId: state.router.params.logId
  }))
export default class LogOutput extends Component {
  static propTypes = {
    // Can't be `isRequired` because the logId dissappears when the log is remotely deleted
    log: PropTypes.object,
    logId: PropTypes.string
  };

  render() {
    const { log, logId } = this.props;

    return !!logId && !!log && <LogOutputPage logId={logId} logData={log.logData} scrollLocked={log.scrollLocked}/>;
  }
}
