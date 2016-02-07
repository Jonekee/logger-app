import React, { Component, PropTypes } from 'react';
import styles from './LogPage.scss';
import { LogPageHeader } from '../../components';
import Helmet from 'react-helmet';

export default class LogPage extends Component {
  static propTypes = {
    groupId: PropTypes.string,
    logId: PropTypes.string,
    log: PropTypes.object,
    children: PropTypes.object.isRequired
  };

  componentDidUpdate() {
    console.log('LogPage:cDU');
  }

  render() {
    const { groupId, logId, log } = this.props; // eslint-disable-line no-shadow


    return (
      <section className={styles.logPage}>
        <Helmet title={log.name}/>
        <LogPageHeader groupId={groupId} logId={logId} log={log}/>
        {this.props.children}
      </section>
    );
  }
}
