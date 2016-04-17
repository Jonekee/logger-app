import React, { Component, PropTypes } from 'react';
import { isLoaded, load as loadLogs, setTailError } from '../../redux/modules/logs';
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
    log: state.logs.data[state.router.params.logId],
    logId: state.router.params.logId
  }), { setTailError })
export default class LogOutput extends Component {
  static propTypes = {
    log: PropTypes.object.isRequired,
    logId: PropTypes.string.isRequired,
    setTailError: PropTypes.func.isRequired
  };

  render() {
    const { log, logId, setTailError } = this.props; // eslint-disable-line

    return <LogOutputPage logId={logId} logData={log.logData} tailError={log.tailError} scrollLocked={log.scrollLocked} setTailError={setTailError}/>;
  }
}
