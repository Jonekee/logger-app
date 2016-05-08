import { Tail } from 'tail';
import SystemHelper from './system.js';
import { Instance as LoggingManager } from 'logging-manager';

class TailHelper {
  constructor() {
    this.activeSessions = {};
  }

  setSocketIo = (io) => {
    this.io = io;
  };

  attachListener = (io, socket, logId) => {
    const file = SystemHelper.getLogFile(logId);
    if (!this.activeSessions[logId]) {
      LoggingManager.debug('TailHelper', 'attachListener', 'Creating new session for logId: ' + logId);

      let tailer;
      try {
        tailer = new Tail(file);
      } catch (error) {
        LoggingManager.error('TailHelper', 'attachListener', `Cannot tail file: ${file}`);
        LoggingManager.error('TailHelper', 'attachListener', `Error code: ${error.code}`);

        let reason;
        if (error.code === 'EACCES') {
          reason = `The server was unable to tail log "${SystemHelper.getLogNameById(logId)}" due to insufficient permissions.`;
        } else if (error.code === 'ENOENT') {
          reason = `The log file for "${SystemHelper.getLogNameById(logId)}" could not be found. Please check that the path and name are correct.`;
        } else {
          reason = `An error occured trying to tail log "${SystemHelper.getLogNameById(logId)}".`;
        }

        return {
          errorCode: error.code,
          errorReason: reason
        };
      }

      tailer.on('error', error => {
        LoggingManager.debug('TailHelper', 'tailerOnError', 'For file: ' + file + ' - ' + error);
      });

      tailer.on('line', data => {
        LoggingManager.trace('TailHelper', 'tailerOnLine', 'For file: ' + file + ' - ' + data);
        io.to('listenerFor_' + logId).emit('lineUpdate', {
          logId,
          newLine: data
        });
      });

      this.activeSessions[logId] = {
        listeners: 0,
        tailer
      };

    }

    this.activeSessions[logId].listeners++;
    socket.join('listenerFor_' + logId);

    return null;
  };

  detachListener = (socket, logId) => {
    LoggingManager.debug('TailHelper', 'detachListener', 'Detaching listener for logId: ' + logId);

    if (!!this.activeSessions[logId] && this.activeSessions[logId].listeners === 1) {
      LoggingManager.debug('TailHelper', 'detachListener', 'Destroying watcher entry');
      this.activeSessions[logId].tailer.unwatch();
      delete(this.activeSessions[logId]);
    } else {
      this.activeSessions[logId].listeners -= 1;
    }

    socket.leave('listenerFor_' + logId);
  };

  killListener = (logId) => {
    // This function will detach all active listeners and clear the Tailer when a log is deleted
    LoggingManager.debug('TailHelper', 'killListener', 'Killing listener for logId: ' + logId);

    if (!!this.activeSessions[logId]) {
      // Kill the tailer so no more lines trigger
      this.activeSessions[logId].tailer.unwatch();
      delete(this.activeSessions[logId]);
      LoggingManager.trace('TailHelper', 'killListener', 'Tailer removed');
      // Remove all sockets from the room
      Object.keys(this.io.sockets.adapter.rooms['listenerFor_' + logId].sockets).forEach(socketId => this.io.sockets.connected[socketId].leave('listenerFor_' + logId));
      LoggingManager.trace('TailHelper', 'killListener', 'Room cleared');
    } else {
      LoggingManager.trace('TailHelper', 'killListener', 'Log was not active');
    }
  };
}

const instance = new TailHelper();

export default instance;
