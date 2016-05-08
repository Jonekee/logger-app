import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addLineToLog } from '../../redux/modules/logs';
import {
  newGroupEmitted,
  groupNameChangeEmitted,
  groupDeleteEmitted,
  newLogEmitted,
  logDeleteEmitted,
  tailErrorEmitted,
  logNameChangeEmitted,
  logGroupChangeEmitted,
  logFileChangeEmitted,
  logPathChangeEmitted
} from '../../redux/modules/sharedActions';

@connect(null, {
  addLineToLog,
  newGroupEmitted,
  groupNameChangeEmitted,
  groupDeleteEmitted,
  newLogEmitted,
  logDeleteEmitted,
  tailErrorEmitted,
  logNameChangeEmitted,
  logGroupChangeEmitted,
  logFileChangeEmitted,
  logPathChangeEmitted
})
export default class SocketEventHandler extends Component {
  static propTypes = {
    addLineToLog: PropTypes.func.isRequired,
    newGroupEmitted: PropTypes.func.isRequired,
    groupNameChangeEmitted: PropTypes.func.isRequired,
    groupDeleteEmitted: PropTypes.func.isRequired,
    newLogEmitted: PropTypes.func.isRequired,
    logDeleteEmitted: PropTypes.func.isRequired,
    tailErrorEmitted: PropTypes.func.isRequired,
    logNameChangeEmitted: PropTypes.func.isRequired,
    logGroupChangeEmitted: PropTypes.func.isRequired,
    logFileChangeEmitted: PropTypes.func.isRequired,
    logPathChangeEmitted: PropTypes.func.isRequired
  };

  componentDidMount() {
    // Mount all socket listeners here
    socket.on('tail:failure', this.setTailError);
    socket.on('lineUpdate', this.addLineToLog);
    socket.on('group:newGroup', this.newGroupEmitted);
    socket.on('group:nameChange', this.groupNameChangeEmitted);
    socket.on('group:groupDelete', this.groupDeleteEmitted);
    socket.on('log:newLog', this.newLogEmitted);
    socket.on('log:logDelete', this.logDeleteEmitted);
    socket.on('log:nameChange', this.logNameChangeEmitted);
    socket.on('log:groupChange', this.logGroupChangeEmitted);
    socket.on('log:fileChange', this.logFileChangeEmitted);
    socket.on('log:pathChange', this.logPathChangeEmitted);
  }

  componentWillUnmount() {
    // Unmount all socket listeners here
    socket.removeListener('tail:failure', this.setTailError);
    socket.removeListener('lineUpdate', this.addLineToLog);
    socket.removeListener('group:newGroup', this.newGroupEmitted);
    socket.removeListener('group:nameChange', this.groupNameChangeEmitted);
    socket.removeListener('group:groupDelete', this.groupDeleteEmitted);
    socket.removeListener('log:newLog', this.newLogEmitted);
    socket.removeListener('log:logDelete', this.logDeleteEmitted);
    socket.removeListener('log:nameChange', this.logNameChangeEmitted);
    socket.removeListener('log:groupChange', this.logGroupChangeEmitted);
    socket.removeListener('log:fileChange', this.logFileChangeEmitted);
    socket.removeListener('log:pathChange', this.logPathChangeEmitted);
  }

  setTailError = (data) => this.props.tailErrorEmitted(data.logId, data.errorReason, data.errorCode);
  addLineToLog = (data) => this.props.addLineToLog(data.logId, data.newLine);
  newGroupEmitted = (data) => this.props.newGroupEmitted(data.newGroupId, data.newGroupName);
  groupNameChangeEmitted = (data) => this.props.groupNameChangeEmitted(data.groupId, data.newName, data.oldName);
  groupDeleteEmitted = (data) => this.props.groupDeleteEmitted(data.groupId, data.logIds, data.groupName);
  newLogEmitted = (data) => this.props.newLogEmitted(`${data.newLogId}`, data.logName, `${data.groupId}`, data.logFile, data.logPath, data.groupName);
  logDeleteEmitted = (data) => this.props.logDeleteEmitted(data.groupId, data.logId, data.logName, data.groupName);
  logNameChangeEmitted = (data) => this.props.logNameChangeEmitted(data.logId, data.newName, data.oldName);
  logGroupChangeEmitted = (data) => this.props.logGroupChangeEmitted(data.logId, data.logName, data.newGroupName, data.oldGroupName, data.newGroupId, data.oldGroupId);
  logFileChangeEmitted = (data) => this.props.logFileChangeEmitted(data.logId, data.logName, data.newFile, data.oldFile);
  logPathChangeEmitted = (data) => this.props.logPathChangeEmitted(data.logId, data.logName, data.newPath, data.oldPath);

  render() {
    return null;
  }
}
