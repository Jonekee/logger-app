import React, { Component, PropTypes } from 'react';
import {isLoaded, load as loadSystem} from '../../redux/modules/appManagement';
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
    system: state.appManagement.data,
    saving: state.appManagement.saving
  }))
export default class AppManagement extends Component {
  static propTypes = {
    system: PropTypes.object.isRequired,
    saving: PropTypes.bool
  };

  render() {
    const { system, saving } = this.props;
    return <AppManagementPage system={system} saving={saving}/>;
  }
}
