import React, { Component, PropTypes } from 'react';
import styles from './AdminPage.scss';
import { Link } from 'react-router';
import { connect } from 'react-redux';

@connect(state => ({ route: state.router.routes }))
export default class LogPage extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    route: PropTypes.array
  }

  render() {
    const { route } = this.props;
    const currentRoute = route[route.length - 1].path;

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
                  <Link to="/dashboard/admin/app" className={currentRoute === 'app' || currentRoute === undefined ? styles.active : ''}>App</Link>
                </li>
                <li>
                  <Link to="/dashboard/admin/groups" className={currentRoute === 'groups' ? styles.active : ''}>Groups</Link>
                </li>
                <li>
                  <Link to="/dashboard/admin/logs" className={currentRoute === 'logs' ? styles.active : ''}>Logs</Link>
                </li>
                <li>
                  <Link to="/dashboard/admin/users" className={currentRoute === 'users' ? styles.active : ''}>Users</Link>
                </li>
                <li>
                  <Link to="/dashboard/admin/syntax" className={currentRoute === 'syntax' ? styles.active : ''}>Syntax</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {this.props.children}
      </section>
    );
  }
}
