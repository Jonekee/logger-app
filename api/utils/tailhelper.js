import { Tail } from 'tail';
import SystemHelper from './system.js';


const activeSessions = {};

export default {
  attachListener(io, socket, groupId, logId) {
    const file = SystemHelper.getLogFile(groupId, logId);
    if (!activeSessions[file]) {
      console.log('[API][TailHelper:attachListener] Creating new session for file: ' + file);
      const tailer = new Tail(file);

      tailer.on('error', error => {
        console.log('[API][TailHelper:tailerOnError] For file: ' + file + ' - ' + error);
      });

      tailer.on('line', data => {
        console.log('[API][TailHelper:tailerOnLine] For file: ' + file + ' - ' + data);
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
    console.log('[API][TailHelper:detachListener] Detaching listener for: ' + file);

    if (!!activeSessions[file] && activeSessions[file].listeners === 1) {
      console.log('[API][TailHelper:detachListener] Destroying watcher entry');
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
