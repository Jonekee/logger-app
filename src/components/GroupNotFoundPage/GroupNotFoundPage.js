import React, { Component, PropTypes } from 'react';
import styles from './GroupNotFoundPage.scss';

export default class GroupNotFoundPage extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    // Should only update if icon name changes
    return nextProps.groupId !== this.props.groupId;
  }

  componentDidUpdate() {
    console.log('Icon:cDU - ' + this.props.groupId);
  }

  render() {
    return (
      <section className={styles.groupNotFoundPage}>
        <h2>Group not found.</h2>
        <p>No group exists for the ID "{this.props.groupId}". The group may have been deleted or you may have entered an incorrect URL.</p>
      </section>
    );
  }
}
