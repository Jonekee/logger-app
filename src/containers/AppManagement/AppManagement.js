import React, { Component, PropTypes } from 'react';
import {isLoaded, load as loadSystem} from '../../redux/modules/system';
import connectData from '../../helpers/connectData';
import {connect} from 'react-redux';
import { AppManagementPage } from '../../components';

function fetchData(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadSystem());
  }
}

@connectData(fetchData)
@connect(
  state => ({
    system: state.system.data
  }))
export default class AppManagement extends Component {
  static propTypes = {
    system: PropTypes.object.isRequired
  };

  render() {
    const { system } = this.props;
    return <AppManagementPage system={system}/>;
  }
}
