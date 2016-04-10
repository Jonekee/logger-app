import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import styles from './LogNotFoundPage.scss';

export default class LogNotFoundPage extends Component {
  static propTypes = {
    logId: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.logId !== this.props.logId;
  }

  componentDidUpdate() {
    console.log('LogNotFoundPage:cDU - ' + this.props.logId);
  }

  render() {
    return (
      <section className={styles.logNotFoundPage}>
        <Helmet title="Log Not Found"/>
        <h2>Log not found.</h2>
        <p>No log exists for the ID "{this.props.logId}". The log may have been deleted or you may have entered an incorrect URL.</p>
      </section>
    );
  }
}
