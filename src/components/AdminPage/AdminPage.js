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
          <div className={styles.row + ' ' + styles.preReleaseA}>
            <h2>Settings</h2>
          </div>
          {releaseStage > 1
            ? (
              <div className={styles.row}>
                <nav>
                  <ul>
                    <li>
                      <Link to="/dashboard/settings/groups" activeClassName={styles.active}>Groups</Link>
                    </li>
                    <li>
                      <Link to="/dashboard/settings/logs" activeClassName={styles.active}>Logs</Link>
                    </li>
                    <li>
                      <Link to="/dashboard/settings/app" activeClassName={styles.active}>App</Link>
                    </li>
                    {releaseStage > 2
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
            )
            : null
          }
        </header>
        {this.props.children}
      </section>
    );
  }
}
