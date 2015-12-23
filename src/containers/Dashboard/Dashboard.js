import React, { Component, PropTypes } from 'react';
import {isLoaded, load as loadGroups} from 'redux/modules/groups';
import connectData from 'helpers/connectData';
import {connect} from 'react-redux';
import { NavPanel } from 'components';

function fetchDataDeferred(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadGroups());
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    groups: state.groups.data
  }))
export default class Dashboard extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    groups: PropTypes.array
  };

  render() {
    const { groups } = this.props;
    const styles = require('./Dashboard.scss');
    return (
      <div className={styles.dashboard}>
        <NavPanel groups={groups}/>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}
