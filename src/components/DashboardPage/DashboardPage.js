import React, {Component, PropTypes} from 'react';
import { Icon } from 'components';
import styles from './DashboardPage.scss';

export default class DashboardPage extends Component {
  static propTypes = {
    groups: PropTypes.array
  }

  render() {
    return (
      <section className={styles.dashboardPage}>
        <header>
          <h2>Dashboard</h2>
          <div>
            <input ref="filter" type="text" placeholder="Filter list..."/>
            <Icon iconName="magnify"/>
          </div>
        </header>
      </section>
    );
  }
}
