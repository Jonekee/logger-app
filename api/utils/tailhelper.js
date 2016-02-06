import { Tail } from 'tail';
import SystemHelper from './system.js';
import { Instance as LoggingManager } from 'logging-manager';

const activeSessions = {};

export default {
  attachListener(io, socket, groupId, logId) {
    const file = SystemHelper.getLogFile(groupId, logId);
    if (!activeSessions[file]) {
      LoggingManager.debug('TailHelper', 'attachListener', 'Creating new session for file: ' + file);
      const tailer = new Tail(file);

      tailer.on('error', error => {
        LoggingManager.debug('TailHelper', 'tailerOnError', 'For file: ' + file + ' - ' + error);
      });

      tailer.on('line', data => {
        LoggingManager.trace('TailHelper', 'tailerOnLine', 'For file: ' + file + ' - ' + data);
        io.to('listenerFor_' + file).emit('lineUpdate', {
          groupId,
          logId,
          newLine: data
        });
      });

      activeSessions[file] = {
        listeners: 0,
        tailer
      };
    }

    activeSessions[file].listeners++;
    socket.join('listenerFor_' + file);
  },
  detachListener(socket, groupId, logId) {
    const file = SystemHelper.getLogFile(groupId, logId);
    LoggingManager.debug('TailHelper', 'detachListener', 'Detaching listener for: ' + file);

    if (!!activeSessions[file] && activeSessions[file].listeners === 1) {
      LoggingManager.debug('TailHelper', 'detachListener', 'Destroying watcher entry');
      activeSessions[file].tailer.unwatch();
      delete(activeSessions[file]);
    } else {
      activeSessions[file].listeners -= 1;
    }

    socket.leave('listenerFor_' + file);
  }
};

// const instance = new TailHelper();

// export default instance;
