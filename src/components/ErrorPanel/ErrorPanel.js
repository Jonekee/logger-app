import React, {Component, PropTypes} from 'react';
import styles from './ErrorPanel.scss';
import { Icon } from '../../components';

export default class ErrorPanel extends Component {
  static propTypes = {
    appSettingsError: PropTypes.object,
    clearAppSettingsError: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    console.log('ErrorPanel:cDU');
  }

  clearMessage = () => {
    this.props.clearAppSettingsError();
  };

  render() {
    const { appSettingsError } = this.props;
    return appSettingsError ? (
      <section className={styles.errorPanel}>
        <Icon iconName="alert-circle" />
        <p><em>Error</em><span>{appSettingsError.errorReason}</span></p>
        <button onClick={this.clearMessage}>
          <Icon iconName="close" />
        </button>
      </section>
    ) : null;
  }
}
