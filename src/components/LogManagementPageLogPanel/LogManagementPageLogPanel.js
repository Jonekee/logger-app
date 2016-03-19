import React, {Component, PropTypes} from 'react';
import styles from './LogManagementPageLogPanel.scss';
import { Icon } from '../../components';

export default class LogManagementPageLogPanel extends Component {
  static propTypes = {
    groupName: PropTypes.string,
    groupId: PropTypes.number.isRequired,
    logId: PropTypes.number.isRequired,
    log: PropTypes.object.isRequired
  };

  shouldComponentUpdate(nextProps) {
    /*  Should only update if IDs, name, file name, file path, activeState,
     *  hasNew or listFilter change
     */
    return this.props.groupName !== nextProps.groupName
      || this.props.groupId !== nextProps.groupId
      || this.props.logId !== nextProps.logId
      || this.props.log.name !== nextProps.log.name;
  }

  componentDidUpdate() {
    console.log('LogManagementPageLogPanel:cDU');
  }

  render() {
    const { groupName, groupId, logId, log } = this.props;
    return (
      <div className={styles.logManagementPageLogPanel}>
        <div className={styles.basePanel}>
          <div className={styles.info}>
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
            <button onClick={() => console.log(`Delete log: ${groupId}:${logId}`)}>
              <Icon iconName="delete"/>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
