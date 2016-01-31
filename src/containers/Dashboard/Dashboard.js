import React, { Component, PropTypes } from 'react';
import {isLoaded, addLineToLog, load as loadGroups} from '../../redux/modules/groups';
import connectData from '../../helpers/connectData';
import { connect } from 'react-redux';
import { NavPanel } from '../../components';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadGroups());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    authEnabled: state.auth.enabled,
    groups: state.groups.data
  }),
  { addLineToLog })
export default class Dashboard extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    authEnabled: PropTypes.bool,
    addLineToLog: PropTypes.func,
    groups: PropTypes.array
  };

  componentDidMount() {
    socket.on('lineUpdate', data => {
      this.props.addLineToLog(data.groupId, data.logId, data.newLine);
    });
  }

  render() {
    const { authEnabled, groups } = this.props;
    const styles = require('./Dashboard.scss');
    return (
      <div className={styles.dashboard}>
        <NavPanel authEnabled={authEnabled} groups={groups}/>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}
