import React, { Component, PropTypes } from 'react';
import styles from './LogManagementPage.scss';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import { Icon, LogManagementPageLogPanel, DropDown, LoadingSpinner } from '../../components';

export default class LogManagementPage extends Component {
  static propTypes = {
    groups: PropTypes.object.isRequired,
    logs: PropTypes.object.isRequired,
    logManagementState: PropTypes.object.isRequired,
    toggleSortByGroup: PropTypes.func.isRequired,
    toggleInputingNewGroup: PropTypes.func.isRequired,
    setNewLogName: PropTypes.func.isRequired,
    setNewLogGroup: PropTypes.func.isRequired,
    setNewLogFile: PropTypes.func.isRequired,
    setNewLogPath: PropTypes.func.isRequired,
    createNewLog: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    console.log('LogManagementPage:cDU');
  }

  render() {
    const { groups, logs, logManagementState, toggleSortByGroup, toggleInputingNewGroup, setNewLogName, setNewLogGroup, setNewLogFile, setNewLogPath, createNewLog } = this.props;

    const fullLogList = [];
    let groupIdsAlphabetically;

    const groupOptionsList = [{
      text: 'Select a group',
      value: '-1'
    }];

    Object.keys(groups).forEach(groupId => {
      groupOptionsList.push({
        text: groups[groupId].name,
        value: '' + groupId
      });

      if (!logManagementState.sortByGroup) {
        groups[groupId].logs.forEach(logId => {
          const log = logs[logId];
          fullLogList.push({
            ...log,
            logId,
            groupId
          });
        });
      } else {
        // Sort log IDs alphabetically by log name
        groups[groupId].logs = groups[groupId].logs.sort((first, second) => (logs[first].name > logs[second].name));
      }
    });

    if (!logManagementState.sortByGroup) {
      fullLogList.sort((first, second) => (first.name > second.name));
    } else {
      groupIdsAlphabetically = Object.keys(groups).sort((first, second) => (groups[first].name > groups[second].name));
    }

    return (
      <section className={styles.logManagementPage}>
        <Helmet title="Admin - Logs"/>
        <header>
          <h2>Log Management</h2>
          <div className={styles.actions}>
            <div>
              <label htmlFor="logManagementPageSortByGroup">Sort by group</label>
              <input id="logManagementPageSortByGroup" type="checkbox" checked={logManagementState.sortByGroup} onChange={toggleSortByGroup} />
            </div>
          </div>
        </header>
        <section>
          <div className={classnames(styles.newLogContainer, { [styles.addLogOpen]: logManagementState.inputingNewLog })}>
            <button className={styles.addButton} onClick={() => toggleInputingNewGroup()}>
              <Icon iconName="plus"/>
              <p>New Log</p>
            </button>
            <div className={classnames(styles.formContainer, styles.fadeInPanel)}>
              <div className={styles.lhs}>
                <form onSubmit={(event) => { createNewLog(logManagementState.newLogName, logManagementState.newLogGroup, logManagementState.newLogFile, logManagementState.newLogPath); event.preventDefault(); return false; }}>
                  <input type="text" placeholder="New log name" maxLength="15" value={logManagementState.newLogName} onChange={(event) => setNewLogName(event.target.value)} />
                  <DropDown customClassName={classnames(styles.selectStyling, { [styles.placeholderColour]: logManagementState.newLogGroup === '-1' })} options={groupOptionsList} initialValue={logManagementState.newLogGroup} onChange={(event) => setNewLogGroup(event.target.value)} />
                  <input type="text" placeholder="File name" maxLength="1000" value={logManagementState.newLogFile} onChange={(event) => setNewLogFile(event.target.value)} />
                  <input type="text" placeholder="File location" maxLength="1000" value={logManagementState.newLogPath} onChange={(event) => setNewLogPath(event.target.value)} />
                </form>
              </div>
              <div className={styles.actions}>
                <button onClick={() => createNewLog(logManagementState.newLogName, logManagementState.newLogGroup, logManagementState.newLogFile, logManagementState.newLogPath)}>
                  <Icon iconName="check"/>
                </button>
                <button onClick={() => toggleInputingNewGroup()}>
                  <Icon iconName="close"/>
                </button>
              </div>
            </div>
            <div className={classnames(styles.savingPanel, styles.fadeInPanel, { [styles.open]: logManagementState.savingNewLog })}>
              <LoadingSpinner size={24} strokeWidth={1}/>
              <p>Creating...</p>
            </div>
          </div>
          <div className={styles.listContainer}>
            {logManagementState.sortByGroup
              ? groupIdsAlphabetically.map(groupId => (
                <div key={groupId}>
                  <h3>{groups[groupId].name}</h3>
                  <ol>
                    {groups[groupId].logs.length > 0
                      ? groups[groupId].logs.map(logId => (<li key={logId}><LogManagementPageLogPanel groupId={groupId} logId={logId} log={logs[logId]} groupOptionsList={groupOptionsList}/></li>))
                      : (
                        <li className={styles.noLogsLine}><p>There are no logs in this group</p></li>
                      )
                    }
                  </ol>
                </div>
              ))
              : (
                <ol className={styles.singleList}>
                  {fullLogList.map(log => (<li key={log.logId}><LogManagementPageLogPanel groupName={groups[log.groupId].name} groupId={log.groupId} logId={log.logId} log={log} groupOptionsList={groupOptionsList}/></li>))}
                </ol>
              )
            }
          </div>
        </section>
      </section>
    );
  }
}
