import React, { Component, PropTypes } from 'react';
import styles from './LogPage.scss';
import { LogPageHeader } from '../../components';
import Helmet from 'react-helmet';

export default class LogPage extends Component {
  static propTypes = {
    logId: PropTypes.string.isRequired,
    log: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
  };

  componentDidUpdate() {
    console.log('LogPage:cDU');
  }

  render() {
    const { logId, log } = this.props; // eslint-disable-line no-shadow


    return (
      <section className={styles.logPage}>
        <Helmet title={log.name}/>
        <LogPageHeader logId={logId} log={log}/>
        {this.props.children}
      </section>
    );
  }
}
