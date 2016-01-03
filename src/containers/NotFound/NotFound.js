import React from 'react';
import styles from './NotFound.scss';
import { Icon } from 'components';

export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <div className={styles.bg}></div>
      <div className={styles.container}>
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
