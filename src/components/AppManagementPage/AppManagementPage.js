import React, { Component, PropTypes } from 'react';
import styles from './AppManagementPage.scss';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { ControlButton, Icon, DropDown, LoadingSpinner } from '../../components';
import { editWebPort, editApiPort, editLogLevel, resetChanges, saveChanges } from '../../redux/modules/appManagement';

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

function portElementIsValid(inputElement) {
  return inputElement && (inputElement.matches
    || inputElement.matchesSelector
    || inputElement.msMatchesSelector
    || inputElement.mozMatchesSelector
    || inputElement.webkitMatchesSelector
    || inputElement.oMatchesSelector).call(inputElement, ':valid');
}

@connect(null, { editWebPort, editApiPort, editLogLevel, resetChanges, saveChanges })
export default class AppManagementPage extends Component {
  static propTypes = {
    system: PropTypes.object.isRequired,
    saving: PropTypes.bool,
    editWebPort: PropTypes.func.isRequired,
    editApiPort: PropTypes.func.isRequired,
    editLogLevel: PropTypes.func.isRequired,
    resetChanges: PropTypes.func.isRequired,
    saveChanges: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    console.log('AppManagementPage:cDU');
  }

  editWebPort = (event) => {
    const newWebPort = event.target.value;
    this.props.editWebPort(newWebPort);
  };

  editApiPort = (event) => {
    const newApiPort = event.target.value;
    this.props.editApiPort(newApiPort);
  };

  editLogLevel = (event) => {
    const newLogLevel = event.target.value;
    this.props.editLogLevel(newLogLevel);
  };

  resetChanges = () => {
    this.props.resetChanges();
  };

  saveChanges = () => {
    const { editableWebPort, editableApiPort, editableLogLevel } = this.props.system;
    this.props.saveChanges(editableWebPort, editableApiPort, editableLogLevel);
  };

  render() {
    const { system, saving } = this.props;

    const valuesHaveChanged = system.webport !== system.editableWebPort
      || system.apiport !== system.editableApiPort
      || system.loglevel !== system.editableLogLevel;

    const portsAreValid = portElementIsValid(this.refs.webportInput)
      && portElementIsValid(this.refs.apiportInput);

    return (
      <section className={styles.appManagementPage}>
        <Helmet title="Settings - App"/>
        <header>
          <h2>Application Settings</h2>
          <div className={styles.actions}>
            {saving ? (
              <div className={styles.savingIndicator}>
                <LoadingSpinner size={24} strokeWidth={1}/>
                <p>Saving...</p>
              </div>
            ) : (
              <div>
                <ControlButton iconName="delete" text="Reset changes" color="negative" isDisabled={!valuesHaveChanged} onClick={this.resetChanges}/>
                <ControlButton iconName="content-save" text="Save changes" color="positive" isDisabled={!valuesHaveChanged || !portsAreValid} onClick={this.saveChanges}/>
              </div>
            )}
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
              <input ref="webportInput" type="number" min="0" max="65535" required value={system.editableWebPort} onChange={this.editWebPort} disabled={saving}/>
            </li>
            <li>
              <label>API Port</label>
              <input ref="apiportInput" type="number" min="0" max="65535" required value={system.editableApiPort} onChange={this.editApiPort} disabled={saving}/>
            </li>
          </ul>
          <h3>Additional Settings</h3>
          <ul>
            <li>
              <label>Log Level</label>
              <div className={styles.dropDown}>
                <DropDown options={logLevelOptions} onChange={this.editLogLevel} initialValue={system.editableLogLevel} isDisabled={saving}/>
              </div>
            </li>
          </ul>
          <h3>App Info</h3>
          <ul className={styles.infoList}>
            <li>
              <label>Version</label>
              <p>v1.0.0</p>
            </li>
            <li>
              <label>Users Enabled</label>
              <p>No</p>
            </li>
            <li>
              <label>Config File</label>
              <p>/some/place/or/whatever/config.json</p>
            </li>
          </ul>
          <p className={styles.helpMeParagraph}>This application is currently in a stage of base feature development. This means that many decisions are still to be made or finalised and everything is open to improvement.</p>
          <p className={styles.helpMeParagraph}>As a one-man team with little scope for user testing, any feedback you have would be greatly appreciated. Feel free to raise an issue or PR on the <a href="https://github.com/logger-app/logger-app" target="_blank">GitHub repo</a>.</p>
        </section>
      </section>
    );
  }
}
