import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addLineToLog, setTailError } from '../../redux/modules/logs';
import { newGroupEmitted, groupNameChangeEmitted, groupDeleteEmitted, newLogEmitted, logDeleteEmitted } from '../../redux/modules/sharedActions';

@connect(null, { addLineToLog, newGroupEmitted, groupNameChangeEmitted, groupDeleteEmitted, newLogEmitted, logDeleteEmitted, setTailError })
export default class SocketEventHandler extends Component {
  static propTypes = {
    addLineToLog: PropTypes.func.isRequired,
    newGroupEmitted: PropTypes.func.isRequired,
    groupNameChangeEmitted: PropTypes.func.isRequired,
    groupDeleteEmitted: PropTypes.func.isRequired,
    newLogEmitted: PropTypes.func.isRequired,
    logDeleteEmitted: PropTypes.func.isRequired,
    setTailError: PropTypes.func.isRequired
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
  }

  setTailError = (data) => this.props.setTailError(data.logId, data.errorCode);
  addLineToLog = (data) => this.props.addLineToLog(data.logId, data.newLine);
  newGroupEmitted = (data) => this.props.newGroupEmitted(data.newGroupId, data.newGroupName);
  groupNameChangeEmitted = (data) => this.props.groupNameChangeEmitted(data.groupId, data.newName, data.oldName);
  groupDeleteEmitted = (data) => this.props.groupDeleteEmitted(data.groupId, data.logIds, data.groupName);
  newLogEmitted = (data) => this.props.newLogEmitted(`${data.newLogId}`, data.logName, `${data.groupId}`, data.logFile, data.logPath);
  logDeleteEmitted = (data) => this.props.logDeleteEmitted(data.groupId, data.logId);

  render() {
    return null;
  }
}
