import React, { Component, PropTypes } from 'react';
import styles from './LogManagementPage.scss';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import { Icon, LogManagementPageLogPanel, DropDown } from '../../components';

export default class LogManagementPage extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    logManagementState: PropTypes.object.isRequired,
    toggleSortByGroup: PropTypes.func.isRequired,
    toggleInputingNewGroup: PropTypes.func.isRequired,
    setNewLogName: PropTypes.func.isRequired,
    setNewLogGroup: PropTypes.func.isRequired,
    setNewLogFile: PropTypes.func.isRequired,
    setNewLogPath: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    console.log('LogManagementPage:cDU');
  }

  render() {
    const { groups, logManagementState, toggleSortByGroup, toggleInputingNewGroup, setNewLogName, setNewLogGroup, setNewLogFile, setNewLogPath } = this.props;

    const fullLogList = [];

    const groupOptionsList = [{
      text: 'Select a group',
      value: '-1'
    }];

    groups.forEach((group, groupId) => {
      groupOptionsList.push({
        text: group.name,
        value: '' + groupId
      });

      if (!logManagementState.sortByGroup) {
        group.logs.forEach((log, logId) => {
          fullLogList.push({
            ...log,
            logId,
            groupId
          });
        });
      }
    });

    if (!logManagementState.sortByGroup) {
      fullLogList.sort((first, second) => {
        const firstName = first.name;
        const secondName = second.name;
        return firstName > secondName;
      });
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
                <input type="text" placeholder="New log name" maxLength="15" value={logManagementState.newLogName} onChange={(event) => setNewLogName(event.target.value)} />
                <DropDown customClassName={classnames(styles.selectStyling, { [styles.placeholderColour]: logManagementState.newLogGroup === '-1' })} options={groupOptionsList} initialValue={logManagementState.newLogGroup} onChange={(event) => setNewLogGroup(event.target.value)} />
                <input type="text" placeholder="File name" maxLength="30" value={logManagementState.newLogFile} onChange={(event) => setNewLogFile(event.target.value)} />
                <input type="text" placeholder="File location" maxLength="30" value={logManagementState.newLogPath} onChange={(event) => setNewLogPath(event.target.value)} />
              </div>
              <div className={styles.actions}>
                <button onClick={() => {}}>
                  <Icon iconName="check"/>
                </button>
                <button onClick={() => toggleInputingNewGroup()}>
                  <Icon iconName="close"/>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.listContainer}>
            {logManagementState.sortByGroup
              ? groups.map((group, index) => (
                <div key={index}>
                  <h3>{group.name}</h3>
                  <ol>
                    {group.logs.length > 0
                      ? group.logs.map((log, iindex) => (<li key={iindex}><LogManagementPageLogPanel groupId={index} logId={iindex} log={log}/></li>))
                      : (
                        <li className={styles.noLogsLine}><p>There are no logs in this group</p></li>
                      )
                    }
                  </ol>
                </div>
              ))
              : (
                <ol className={styles.singleList}>
                  {fullLogList.map((log, iindex) => (<li key={iindex}><LogManagementPageLogPanel groupName={groups[log.groupId].name} groupId={log.groupId} logId={log.logId} log={log}/></li>))}
                </ol>
              )
            }
          </div>
        </section>
      </section>
    );
  }
}
