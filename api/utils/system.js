import fs from 'fs';
import Bcrypt from 'bcrypt-nodejs';
import { Instance as LoggingManager } from 'logging-manager';

/* eslint func-names:0 */

function readFile(file) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, 'utf-8', function(err, data) {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}

function writeFile(file, contents) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(file, contents, 'utf-8', function(err) {
      if (err) reject(err);
      else resolve();
    });
  });
}

class SystemHelper {
  constructor() {
    LoggingManager.system('SystemHelper', 'constructor', 'Initialising SystemHelper, reading config file...');
    this.fileLocation = global.__CONFIG_FILE__;
    readFile(this.fileLocation)
      .then((data) => {
        LoggingManager.system('SystemHelper', 'constructor', 'Finished reading system file');
        this.system = data;

        // Check that the essentials are there
        let configChanged = false;

        if (!this.system.app) {
          this.system.app = {
            webport: 8080,
            apiport: 3030,
            loglevel: 'ERROR',
            fakeWebSockets: false
          };
          configChanged = true;
        }

        if (!this.system.users) {
          this.system.users = {};
          configChanged = true;
        }

        if (!this.system.groups) {
          this.system.groups = {};
          configChanged = true;
        }

        if (!this.system.logs) {
          this.system.logs = {};
          configChanged = true;
        }

        if (configChanged) {
          LoggingManager.info('SystemHelper', 'constructor', 'Config file was missing some properties, defaults are being added.');
          return this.saveConfigToDisk();
        }
      })
      .catch((error) => {
        LoggingManager.fatal('SystemHelper', 'constructor', 'Failed to read system file');
        LoggingManager.fatal('SystemHelper', 'constructor', error);
        process.exit(1);
      });
  }

  setSocketIo = (io) => {
    this.socketio = io;
  };

  saveConfigToDisk = () => {
    LoggingManager.debug('SystemHelper', 'saveConfigToDisk', 'Writing system file to disk');
    return writeFile(this.fileLocation, JSON.stringify(this.system, null, 2))
      .then(() => {
        LoggingManager.debug('SystemHelper', 'saveConfigToDisk', 'Finished writing system file to disk');
      })
      .catch((error) => {
        LoggingManager.fatal('SystemHelper', 'saveConfigToDisk', 'Failed to write file to disk');
        LoggingManager.fatal('SystemHelper', 'saveConfigToDisk', error);
        return Promise.reject(error);
      });
  };

  getAppSettings = () => {
    return this.system.app;
  };

  getGroups = () => {
    return this.system.groups;
  };

  getLogs = () => {
    return this.system.logs;
  };

  checkForUser = (username) => {
    return !!this.system.users[username];
  };

  checkUserPassword = (username, password) => {
    return new Promise((resolve, reject) => {
      Bcrypt.compare(password, this.system.users[username].passhash, function(err, result) {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };

  getLogNameById = (logId) => {
    return this.system.logs[logId].name;
  };

  getLogFile = (logId) => {
    const log = this.system.logs[logId];
    return log.fpath + log.fname;
  };

  updateSystemSettings = (newWebPort, newApiPort, newLogLevel) => {
    this.system.app = {
      ...this.system.app,
      webport: newWebPort,
      apiport: newApiPort,
      loglevel: newLogLevel
    };
    LoggingManager.setLogLevel(newLogLevel);
    return this.saveConfigToDisk();
  };

  updateGroupName = (groupId, newName) => {
    const oldName = this.system.groups[groupId].name;
    LoggingManager.debug('SystemHelper', 'updateGroupName', `Updating group name using groupId: ${groupId} from "${oldName}" to newName: ${newName}`);
    this.system.groups[groupId].name = newName;
    return this.saveConfigToDisk().then(() => {
      // Emit updated group to all sessions including the guy that updated the group
      this.socketio.emit('group:nameChange', { groupId, newName, oldName });
    });
  };

  groupIdIsValid = (groupId) => {
    LoggingManager.debug('SystemHelper', 'groupIdIsValid', `Checking groupId: ${groupId}`);
    return !!this.system.groups[groupId];
  };

  logIdIsValid = (logId) => {
    LoggingManager.debug('SystemHelper', 'logIdIsValid', `Checking logId: ${logId}`);
    return !!this.system.logs[logId];
  };

  deleteGroup = (groupId) => {
    LoggingManager.debug('SystemHelper', 'deleteGroup', `Deleting group using groupId: ${groupId}`);
    const groupName = this.system.groups[groupId].name;
    const logIds = this.system.groups[groupId].logs;
    this.system.groups[groupId].logs.forEach(logId => {
      delete this.system.logs[logId];
    });
    delete this.system.groups[groupId];
    return this.saveConfigToDisk().then(() => {
      // Emit deleted group to all sessions including the guy that deleted the group
      LoggingManager.debug('SystemHelper', 'deleteGroup', `Emitting delete group for: ${groupId}`);
      this.socketio.emit('group:groupDelete', { groupId, logIds, groupName });
    });
  };

  createGroup = (newGroupName) => {
    LoggingManager.debug('SystemHelper', 'createGroup', `Creating new group using name: ${newGroupName}`);

    // Get new ID:
    const currentKeys = Object.keys(this.system.groups).map(key => parseInt(key, 10)).sort((first, second) => first > second);
    const newGroupId = (currentKeys.pop() || 0) + 1;
    LoggingManager.debug('SystemHelper', 'createGroup', `Allocated group ID: ${newGroupId}`);

    // Create group
    this.system.groups[newGroupId] = {
      name: newGroupName,
      logs: []
    };
    return this.saveConfigToDisk().then(() => {
      // Emit new group to all sessions including the guy that created the group
      this.socketio.emit('group:newGroup', { newGroupId, newGroupName });
    });
  };

  createLog = (logName, groupId, logFile, logPath) => {
    LoggingManager.debug('SystemHelper', 'createLog', `Creating log using: ${logName} ${groupId} ${logFile} ${logPath}`);

    // Get new ID:
    const currentKeys = Object.keys(this.system.logs).map(key => parseInt(key, 10)).sort((first, second) => first > second);
    const newLogId = (currentKeys.pop() || 0) + 1;
    LoggingManager.debug('SystemHelper', 'createGroup', `Allocated log ID: ${newLogId}`);

    // Create log
    this.system.logs[newLogId] = {
      name: logName,
      fname: logFile,
      fpath: logPath
    };
    // Add reference in group
    this.system.groups[groupId].logs.push(`${newLogId}`);
    const groupName = this.system.groups[groupId].name;
    return this.saveConfigToDisk().then(() => {
      // Emit new log to all sessions including the guy that created the log
      this.socketio.emit('log:newLog', { newLogId, logName, groupId, logFile, logPath, groupName });
    });
  };

  deleteLog = (groupId, logId) => {
    LoggingManager.debug('SystemHelper', 'deleteLog', `Deleting log using groupId: ${groupId} and logId: ${logId}`);
    const logName = this.system.logs[logId].name;
    const groupName = this.system.groups[groupId].name;
    delete this.system.logs[logId];
    this.system.groups[groupId].logs = this.system.groups[groupId].logs.filter(filterLogId => filterLogId !== logId);
    return this.saveConfigToDisk().then(() => {
      // Emit deleted log to all sessions including the guy that deleted the log
      this.socketio.emit('log:logDelete', { groupId, logId, logName, groupName });
    });
  };

  updateLog = (logId, oldGroupId, editedName, editedGroupId, editedFile, editedPath) => {
    LoggingManager.debug('SystemHelper', 'updateLog', `Editing log using log ID: ${logId}`);

    const oldName = this.system.logs[logId].name;
    const oldFile = this.system.logs[logId].fname;
    const oldPath = this.system.logs[logId].fpath;

    let oldGroupName;
    let newGroupName;

    if (oldName !== editedName) {
      this.system.logs[logId].name = editedName;
    }
    if (oldGroupId !== editedGroupId) {
      oldGroupName = this.system.groups[oldGroupId].name;
      newGroupName = this.system.groups[editedGroupId].name;

      this.system.groups[oldGroupId].logs = this.system.groups[oldGroupId].logs.filter(id => id !== logId);
      this.system.groups[editedGroupId].logs.push(logId);
    }
    if (oldFile !== editedFile) {
      this.system.logs[logId].fname = editedFile;
    }
    if (oldPath !== editedPath) {
      this.system.logs[logId].fpath = editedPath;
    }

    return this.saveConfigToDisk().then(() => {
      // Emit log changes to all sessions including the guy that edited the log
      if (oldName !== editedName) {
        this.socketio.emit('log:nameChange', { logId, newName: editedName, oldName });
      }
      if (oldGroupId !== editedGroupId) {
        this.socketio.emit('log:groupChange', { logId, logName: editedName, newGroupName, oldGroupName });
      }
      if (oldFile !== editedFile) {
        this.socketio.emit('log:fileChange', { logId, logName: editedName, newFile: editedFile, oldFile });
      }
      if (oldPath !== editedPath) {
        this.socketio.emit('log:pathChange', { logId, logName: editedName, newPath: editedPath, oldPath });
      }
    });
  };
}

const instance = new SystemHelper();

export default instance;
