import React, {Component, PropTypes} from 'react';
import styles from './LogManagementPageLogPanel.scss';
import { Icon, LoadingSpinner } from '../../components';
import classnames from 'classnames';

export default class LogManagementPageLogPanel extends Component {
  static propTypes = {
    groupName: PropTypes.string,
    groupId: PropTypes.string.isRequired,
    logId: PropTypes.string.isRequired,
    log: PropTypes.object.isRequired,
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
      || this.props.log.deletePanelOpen !== nextProps.log.deletePanelOpen
      || this.props.log.deleteSaving !== nextProps.log.deleteSaving;
  }

  componentDidUpdate() {
    console.log('LogManagementPageLogPanel:cDU');
  }

  render() {
    const { groupName, groupId, logId, log, toggleDeleteLogOpen, deleteLog } = this.props;
    return (
      <div className={styles.logManagementPageLogPanel}>
        <div className={styles.basePanel}>
          <div className={styles.lhs}>
            <p>{log.name}</p>
            <p>
              <span>File:</span>
              <span>{log.fpath + log.fname}</span>
            </p>
            {groupName && (<p><span>Group:</span><span>{groupName}</span></p>)}
          </div>
          <div className={styles.actions}>
            <button onClick={() => console.log(`Change name: ${groupId}:${logId}`)}>
              <Icon iconName="pencil"/>
            </button>
            <button onClick={() => toggleDeleteLogOpen(logId)}>
              <Icon iconName="delete"/>
            </button>
          </div>
        </div>
        <div className={classnames(styles.deleteCheckPanel, styles.fadeInPanel, { [styles.open]: log.deletePanelOpen })}>
          <div className={styles.lhs}>
            <p>Are you sure you want to delete log: "{log.name}"</p>
          </div>
          <div className={styles.actions}>
            <button onClick={() => deleteLog(groupId, logId)}>
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
