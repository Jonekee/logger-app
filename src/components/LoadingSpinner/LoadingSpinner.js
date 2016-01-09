import React, {Component} from 'react';
import styles from './LoadingSpinner.scss';

export default class LoadingSpinner extends Component {
  componentDidUpdate() {
    console.log('LoadingSpinner:cDU');
  }

  render() {
    return (
      <article className={styles.loadingSpinner}>
				<svg>
					<circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" stroke-miterlimit="10"/>
				</svg>
			</article>
    );
  }
}
