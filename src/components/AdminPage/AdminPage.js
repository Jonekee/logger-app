import React, { Component, PropTypes } from 'react';
import styles from './AdminPage.scss';
import { Link } from 'react-router';
import { releaseStage } from '../../config';

export default class AdminPage extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  componentDidUpdate() {
    console.log('AdminPage:cDU');
  }

  render() {
    return (
      <section className={styles.adminPage}>
        <header>
          <div className={styles.row}>
            <h2>Admin Controls</h2>
          </div>
          <div className={styles.row}>
            <nav>
              <ul>
                <li>
                  <Link to="/dashboard/admin/app" activeClassName={styles.active}>App</Link>
                </li>
                <li>
                  <Link to="/dashboard/admin/groups" activeClassName={styles.active}>Groups</Link>
                </li>
                <li>
                  <Link to="/dashboard/admin/logs" activeClassName={styles.active}>Logs</Link>
                </li>
                {releaseStage > 1
                  ? (
                    <li>
                      <Link to="/dashboard/admin/users" activeClassName={styles.active}>Users</Link>
                    </li>
                  )
                  : null
                }
                {releaseStage > 3
                  ? (
                    <li>
                      <Link to="/dashboard/admin/syntax" activeClassName={styles.active}>Syntax</Link>
                    </li>
                  )
                  : null
                }
              </ul>
            </nav>
          </div>
        </header>
        {this.props.children}
      </section>
    );
  }
}
