import React, { Component, PropTypes } from 'react';
import styles from './AnalysisPage.scss';
import { Icon } from 'components';

export default class AnalysisPage extends Component {
  static propTypes = {
    groupId: PropTypes.string,
    logId: PropTypes.string,
    logData: PropTypes.array,
    logLevelMapping: PropTypes.object
  }

  componentDidUpdate() {
    console.log('AnalysisPage:cDU');
  }

  render() {
    const { logData, logLevelMapping } = this.props;
    let contents;
    if (logLevelMapping) {
      console.log('Performing analysis');
      console.log(!!logData);
      contents = (
        <ul>
        </ul>
      );
    } else {
      contents = (
        <article className={styles.fullPageError}>
          <Icon iconName="alert-circle"/>
          <div>
            <h3>No log syntax set</h3>
            <p>You must set a syntax matcher on the log so that the analysis tool can detect and count which lines are errors, debug messages, etc...</p>
          </div>
        </article>
      );
    }

    return (
      <section className={styles.analysisPage}>
        {contents}
      </section>
    );
  }
}
