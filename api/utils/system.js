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
          this.system.groups = [];
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

  saveConfigToDisk = () => {
    LoggingManager.debug('SystemHelper', 'saveConfigToDisk', 'Writing system file to disk');
    return writeFile(this.fileLocation, JSON.stringify(this.system, null, 2))
      .then(() => {
        LoggingManager.debug('SystemHelper', 'saveConfigToDisk', 'Finished writing system file to disk');
      })
      .catch((error) => {
        LoggingManager.fatal('SystemHelper', 'saveConfigToDisk', 'Failed to write file to disk');
        LoggingManager.fatal('SystemHelper', 'saveConfigToDisk', error);
        process.exit(1);
      });
  };

  getSystemSettings = () => {
    return this.system.app;
  };

  getGroupNames = () => {
    return Object.keys(this.system.groups);
  };

  getGroups = () => {
    return this.system.groups;
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

  getLogFile = (groupId, logId) => {
    const log = this.system.groups[groupId].logs[logId];
    return log.fpath + log.fname;
  };
}

const instance = new SystemHelper();

export default instance;
