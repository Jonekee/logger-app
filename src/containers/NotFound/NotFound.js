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
      this.setState({
        widthPercentage: event.pageX / window.innerWidth,
        heightPercentage: event.pageY / window.innerHeight
      });
    };
  }

  render() {
    const { widthPercentage, heightPercentage } = this.state;
    const leftModifier = (widthPercentage - 0.5) * maxMovementPercentage;
    const topModifier = (heightPercentage - 0.5) * maxMovementPercentage;
    const containerLeft = (leftModifier * -2) + 50;
    const containerTop = (topModifier * -2) + 50;
    const backgroundLeft = (leftModifier * 3) - 50;
    const backgroundTop = (topModifier * 3) - 50;
    return (
      <main className={styles.notFound}>
        <Helmet title="Not Found - 404"/>
        <div className={styles.bg} style={{ left: backgroundLeft + '%', top: backgroundTop + '%' }}></div>
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
