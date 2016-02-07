import React, { Component } from 'react';
import styles from './NotFound.scss';
import { Icon } from '../../components';
import Helmet from 'react-helmet';

const maxMovementPercentage = 1;

export default class NotFound extends Component {
  constructor() {
    super();
    this.state = {
      widthPercentage: 0.5,
      heightPercentage: 0.5
    };
  }

  componentDidMount() {
    document.onmousemove = (event) => {
      const widthPercentage = event.pageX / window.innerWidth;
      const heightPercentage = event.pageY / window.innerHeight;
      this.setState({
        widthPercentage,
        heightPercentage
      });
      console.log('[X:' + event.pageX + ', Y:' + event.pageY + '] [' + widthPercentage + '%, ' + heightPercentage + '%]');
    };
  }

  render() {
    const { widthPercentage, heightPercentage } = this.state;
    const containerLeft = ((widthPercentage - 0.5) * -1 * maxMovementPercentage) + 50;
    const containerTop = ((heightPercentage - 0.5) * -1 * maxMovementPercentage) + 50;
    return (
      <main className={styles.notFound}>
        <Helmet title="Not Found - 404"/>
        <div className={styles.bg} style={{ left: ((-1 * containerLeft)) + '%', top: ((-1 * containerTop)) + '%' }}></div>
        <div className={styles.container} style={{ left: containerLeft + '%', top: containerTop + '%' }}>
          <div className={styles.transform}>
            <a href="/dashboard">
              <Icon iconName="keyboard-backspace"/>
              <span>Dashboard</span>
            </a>
            <h1>404</h1>
            <p>This is not the page you are looking for</p>
          </div>
        </div>
      </main>
    );
  }
}
