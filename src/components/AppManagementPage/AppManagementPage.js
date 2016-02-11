import React, { Component, PropTypes } from 'react';
import styles from './AppManagementPage.scss';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { ControlButton, Icon, DropDown } from '../../components';
import { editWebPort, editApiPort, editLogLevel } from '../../redux/modules/system';

const logLevelOptions = [
  {
    text: 'SYSTEM',
    value: 'SYSTEM'
  },
  {
    text: 'FATAL',
    value: 'FATAL'
  },
  {
    text: 'ERROR',
    value: 'ERROR'
  },
  {
    text: 'INFO',
    value: 'INFO'
  },
  {
    text: 'DEBUG',
    value: 'DEBUG'
  },
  {
    text: 'TRACE',
    value: 'TRACE'
  }
];

@connect(null, { editWebPort, editApiPort, editLogLevel })
export default class AppManagementPage extends Component {
  static propTypes = {
    system: PropTypes.object.isRequired,
    editWebPort: PropTypes.func.isRequired,
    editApiPort: PropTypes.func.isRequired,
    editLogLevel: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    console.log('AppManagementPage:cDU');
  }

  editWebPort = (event) => {
    const newWebPort = event.target.value;
    this.props.editWebPort(newWebPort);
  };

  render() {
    const { system } = this.props;
    return (
      <section className={styles.appManagementPage}>
        <Helmet title="Admin - App"/>
        <header>
          <h2>Application Management</h2>
          <div className={styles.actions}>
            <ControlButton iconName="play" text="Save changes" color="positive" />
            <ControlButton iconName="play" text="Reset changes" color="positive" />
          </div>
        </header>
        <section>
          <h3>Server Ports</h3>
          <article className={styles.alert}>
            <Icon iconName="alert-circle" />
            <p>The application must be manually restarted to reflect port changes</p>
          </article>
          <ul>
            <li>
              <label>Web Port</label>
              <input type="text" value={system.editableWebPort} onChange={this.editWebPort}/>
            </li>
            <li>
              <label>API Port</label>
              <input type="text" value={system.editableApiPort}/>
            </li>
          </ul>
          <h3>Additional Settings</h3>
          <ul>
            <li>
              <label>Log Level</label>
              <div className={styles.dropDown}>
                <DropDown options={logLevelOptions} onChange={() => {}} />
              </div>
            </li>
          </ul>
        </section>
      </section>
    );
  }
}
