import React, {Component, PropTypes} from 'react';
import styles from './LogManagementPageLogPanel.scss';
import { Icon, LoadingSpinner, DropDown } from '../../components';
import classnames from 'classnames';
import { toggleDeleteLogOpen, deleteLog, toggleEditOpen, setEditedName, setEditedGroup, setEditedFile, setEditedPath, saveLogChanges } from '../../redux/modules/logs';
import { connect } from 'react-redux';

@connect(null, { toggleDeleteLogOpen, deleteLog, toggleEditOpen, setEditedName, setEditedGroup, setEditedFile, setEditedPath, saveLogChanges })
export default class LogManagementPageLogPanel extends Component {
  static propTypes = {
    groupName: PropTypes.string,
    groupId: PropTypes.string.isRequired,
    logId: PropTypes.string.isRequired,
    log: PropTypes.object.isRequired,
    groupOptionsList: PropTypes.array,
    toggleEditOpen: PropTypes.func.isRequired,
    setEditedName: PropTypes.func.isRequired,
    setEditedGroup: PropTypes.func.isRequired,
    setEditedFile: PropTypes.func.isRequired,
    setEditedPath: PropTypes.func.isRequired,
    saveLogChanges: PropTypes.func.isRequired,
    toggleDeleteLogOpen: PropTypes.func.isRequired,
    deleteLog: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    /*  Should only update if IDs, name, file name, file path, activeState,
     *  hasNew or listFilter change
     */
    return this.props.groupName !== nextProps.groupName
      || this.props.groupId !== nextProps.groupId
      || this.props.logId !== nextProps.logId
      || this.props.log.name !== nextProps.log.name
      || this.props.log.editPanelOpen !== nextProps.log.editPanelOpen
      || this.props.log.editedName !== nextProps.log.editedName
      || this.props.log.editedGroup !== nextProps.log.editedGroup
      || this.props.log.editedFile !== nextProps.log.editedFile
      || this.props.log.editedPath !== nextProps.log.editedPath
      || this.props.log.deletePanelOpen !== nextProps.log.deletePanelOpen
      || this.props.log.deleteSaving !== nextProps.log.deleteSaving;
  }

  componentDidUpdate() {
    console.log('LogManagementPageLogPanel:cDU');
  }

  render() {
    const { groupName, groupId, logId, log, groupOptionsList, toggleEditOpen, setEditedName, setEditedGroup, setEditedPath, setEditedFile, saveLogChanges, toggleDeleteLogOpen, deleteLog } = this.props; // eslint-disable-line
    return (
      <div className={classnames(styles.logManagementPageLogPanel, { [styles.formOpen]: log.editPanelOpen })}>
        <div className={styles.basePanel}>
          <div className={styles.lhs}>
            <p>{log.name}</p>
            <p>
              <span>File:</span>
              <span title={log.fname}>{log.fname}</span>
            </p>
            <p>
              <span>Path:</span>
              <span title={log.fpath}>{log.fpath}</span>
            </p>
            {groupName && (<p><span>Group:</span><span>{groupName}</span></p>)}
          </div>
          <div className={styles.actions}>
            <button onClick={() => toggleEditOpen(logId)}>
              <Icon iconName="pencil"/>
            </button>
            <button onClick={() => toggleDeleteLogOpen(logId)}>
              <Icon iconName="delete"/>
            </button>
          </div>
        </div>
        <div className={classnames(styles.formContainer, styles.fadeInPanel, { [styles.open]: log.editPanelOpen })}>
          <div className={styles.lhs}>
            <form onSubmit={(event) => { saveLogChanges(logId, log.editedName, log.editedGroup, log.editedFile, log.editedPath); event.preventDefault(); return false; }}>
              <input type="text" placeholder="New log name" maxLength="15" value={log.editedName} onChange={(event) => setEditedName(logId, event.target.value)} />
              <DropDown customClassName={classnames(styles.selectStyling, { [styles.placeholderColour]: log.editedGroup === '-1' })} options={groupOptionsList} initialValue={log.editedGroup || groupId} onChange={(event) => setEditedGroup(logId, event.target.value)} />
              <input type="text" placeholder="File name" maxLength="1000" value={log.editedFile} onChange={(event) => setEditedFile(logId, event.target.value)} />
              <input type="text" placeholder="File location" maxLength="1000" value={log.editedPath} onChange={(event) => setEditedPath(logId, event.target.value)} />
            </form>
          </div>
          <div className={styles.actions}>
            <button onClick={() => saveLogChanges(logId, log.editedName, log.editedGroup, log.editedFile, log.editedPath)}>
              <Icon iconName="check"/>
            </button>
            <button onClick={() => toggleEditOpen(logId)}>
              <Icon iconName="close"/>
            </button>
          </div>
        </div>
        <div className={classnames(styles.savingPanel, styles.fadeInPanel, { [styles.open]: log.editSaving })}>
          <LoadingSpinner size={24} strokeWidth={1}/>
          <p>Saving...</p>
        </div>
        <div className={classnames(styles.deleteCheckPanel, styles.fadeInPanel, { [styles.open]: log.deletePanelOpen })}>
          <div className={styles.lhs}>
            <p>Are you sure you want to delete log: "{log.name}"</p>
          </div>
          <div className={styles.actions}>
            <button onClick={() => deleteLog(groupId, logId, log.name)}>
              <Icon iconName="check"/>
            </button>
            <button onClick={() => toggleDeleteLogOpen(logId)}>
              <Icon iconName="close"/>
            </button>
          </div>
        </div>
        <div className={classnames(styles.deletingPanel, styles.fadeInPanel, { [styles.open]: log.deleteSaving })}>
          <LoadingSpinner size={24} strokeWidth={1}/>
          <p>Deleting...</p>
        </div>
      </div>
    );
  }
}
