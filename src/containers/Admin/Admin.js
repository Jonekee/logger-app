import React, { Component, PropTypes } from 'react';
import { AdminPage } from '../../components';

export default class Admin extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    return (
      <AdminPage>
        {this.props.children}
      </AdminPage>
    );
  }
}
