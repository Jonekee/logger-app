import fs from 'fs';
import Bcrypt from 'bcrypt-nodejs';

/* eslint func-names:0 */

const relativeSystemFileLocation = global.__LIB_VERSION__ ? '/../../../' : '/../../';

function readFile(file) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, 'utf-8', function(err, data) {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}

class SystemHelper {
  constructor() {
    console.log('Initialising SystemHelper');
    const systemFile = __dirname + relativeSystemFileLocation + 'system.json';
    readFile(systemFile)
      .then((data) => {
        console.log('Finished reading system file');
        this.system = data;
      })
      .catch((error) => {
        console.log('Failed to read system file');
        console.log(error);
      });
  }

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
