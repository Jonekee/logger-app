import React, { Component, PropTypes } from 'react';
import { isLoaded, load as loadLogs } from '../../redux/modules/logz';
import connectData from '../../helpers/connectData';
import {connect} from 'react-redux';
import { LogPage, LogNotFoundPage } from '../../components';

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
export default class Log extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    logId: PropTypes.string.isRequired,
    log: PropTypes.object
  };

  render() {
    const { log, logId } = this.props;

    return log ? (
      <LogPage logId={logId} log={log}>
        {this.props.children}
      </LogPage>
    ) : <LogNotFoundPage logId={logId}/>;
  }
}
