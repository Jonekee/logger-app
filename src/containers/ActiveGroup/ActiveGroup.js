import React, { Component, PropTypes } from 'react';
import { isLoaded, load as loadGroups } from '../../redux/modules/groupz';
import { setActiveGroupListFilter } from '../../redux/modules/appInterface';
import connectData from '../../helpers/connectData';
import { connect } from 'react-redux';
import { ActiveGroupPage } from '../../components';

function fetchData(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(loadGroups());
  }
}

@connectData(fetchData)
@connect(
  state => ({
    activeGroupListFilter: state.appInterface.activeGroupListFilter,
    groups: state.groupz.data,
    logs: state.logz.data
  }),
  { setActiveGroupListFilter })
export default class ActiveGroup extends Component {
  static propTypes = {
    activeGroupListFilter: PropTypes.string,
    groups: PropTypes.object.isRequired,
    logs: PropTypes.object.isRequired,
    setActiveGroupListFilter: PropTypes.func
  };

  render() {
    return (
      <ActiveGroupPage {...this.props}/>
    );
  }
}
