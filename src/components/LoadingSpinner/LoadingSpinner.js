import React, { Component, PropTypes } from 'react';
import styles from './LoadingSpinner.scss';

// TODO ## Remove this temporary disable
/* eslint react/no-unknown-property:0 */

export default class LoadingSpinner extends Component {
  static propTypes = {
    size: PropTypes.number,
    strokeWidth: PropTypes.number
  };

  componentDidUpdate() {
    console.log('LoadingSpinner:cDU');
  }

  render() {
    const { size, strokeWidth } = this.props;
    return (
      <article className={styles.loadingSpinner} style={{ height: size + 'px', width: size + 'px' }}>
        <svg style={{ height: size + 'px', width: size + 'px' }}>
          <circle class="path" cx={size / 2} cy={size / 2} r={(size / 2) - (4 * strokeWidth)} fill="none" stroke-width={strokeWidth || 2} stroke-miterlimit="10"/>
        </svg>
      </article>
    );
  }
}
