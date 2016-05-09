#!/usr/bin/env node
/* eslint no-var:0, vars-on-top:0, func-names:0 */

var program = require('commander');
var path = require('path');
var fs = require('fs');

var defaultWebPort = 8080;
var defaultAPIPort = 3030;
var defaultLogLevel = 'ERROR';

program
  .version('1.0.2')
  .option('-p, --port [port]', 'Port to run webserver on.')
  .option('-a, --apiport [apiport]', 'Port to run API server on.')
  .option('-l, --loglevel [loglevel]', 'Log level to output.')
  .option('-c, --config [config]', 'Config file for app and system.')
  .option('-n, --newconfig [newconfig]', 'Create a new config file at the give path and name.')
  .parse(process.argv);


// Get LoggingManager after the `program` setup so that it's init output isn't
// printed when the user is only running the `-V` or `-h` commands
var LoggingManager = require('logging-manager').Instance;

/*
This should either use the config file passed, or the system.json already
installed.

If ports or log level is not found, defaults should be used.

If either config file can't be used then error and exit the process.

If command line argument ports or log level were passed, override config file
*/

var config;
var configFile;

if (!!program.newconfig) {
  LoggingManager.system('APP', 'main', 'Creating new config file at location: ' + program.newconfig);

  // Create from template
  var configTemplate = {
    app: {
      webport: 8080,
      apiport: 3030,
      loglevel: 'ERROR',
      fakeWebSockets: false
    },
    groups: {},
    logs: {}
  };

  try {
    var fd = fs.openSync(program.newconfig, 'wx');
    fs.writeSync(fd, JSON.stringify(configTemplate, null, 2), 'utf-8');
  } catch (error) {
    if (!!error && !!error.code) {
      // Tailor output to error code
      if (error.code === 'EEXIST') {
        LoggingManager.fatal('APP', 'main', 'Error: That file already exists. (' + error.code + ')');
      } else if (error.code === 'ENOENT') {
        LoggingManager.fatal('APP', 'main', 'Error: The containing folder could not be found. (' + error.code + ')');
      } else {
        LoggingManager.fatal('APP', 'main', 'Error: An unexpected error occured when trying to create the new config file. (' + error.code + ')');
      }
    } else {
      LoggingManager.fatal('APP', 'main', 'Error: An unexpected error occured when trying to create the new config file.');
      LoggingManager.fatal('APP', 'main', error);
    }
    process.exit(1);
  }

  LoggingManager.system('APP', 'main', 'New config file created, to use run the command with --config ' + program.newconfig);
  process.exit(0);
}

if (!!program.config) {
  LoggingManager.system('APP', 'main', 'Using config file: ' + program.config);
  configFile = program.config;
} else {
  LoggingManager.fatal('APP', 'main', 'Error: No config file specified!');
  LoggingManager.fatal('APP', 'main', 'Use --config [file] to specify a config file or --newconfig [file] to create one.');
  process.exit(1);
}

// Set configFile reference for use by the servers later on
global.__CONFIG_FILE__ = configFile;

LoggingManager.system('APP', 'main', 'Reading config file: ' + configFile);

// Read file
try {
  config = fs.readFileSync(configFile, { encoding: 'utf8' });
} catch (error) {
  LoggingManager.fatal('APP', 'main', 'Error: Failed to read config file.');
  LoggingManager.fatal('APP', 'main', error);
  process.exit(1);
}

// Parse JSON
try {
  config = JSON.parse(config);
} catch (error) {
  LoggingManager.fatal('APP', 'main', 'Config file is not valid JSON.');
  LoggingManager.fatal('APP', 'main', error);
  process.exit(1);
}

// Successfully loaded config
LoggingManager.system('APP', 'main', 'Finished reading config file.');


// Warn user if any default values were used:
if (!program.port && !(config.app && config.app.webport)) {
  LoggingManager.system('APP', 'main', 'Warning! No webserver port value found in config file, using default value: ' + defaultWebPort);
}
if (!program.apiport && !(config.app && config.app.apiport)) {
  LoggingManager.system('APP', 'main', 'Warning! No API server port value found in config file, using default value: ' + defaultAPIPort);
}
if (!program.loglevel && !(config.app && config.app.loglevel)) {
  LoggingManager.system('APP', 'main', 'Warning! No log level value found in config file, using default value: ' + defaultLogLevel);
}


// Set values or defaults:
process.env.PORT = program.port || (config.app && config.app.webport) || defaultWebPort;
process.env.APIPORT = program.apiport || (config.app && config.app.apiport) || defaultAPIPort;
LoggingManager.setLogLevel(program.loglevel || (config.app && config.app.loglevel) || defaultLogLevel);


// App initialisation code:
LoggingManager.system('APP', 'main', 'Starting app using webserver port: ' + process.env.PORT + ' and API port: ' + process.env.APIPORT);

var rootDir = path.resolve(__dirname, '..');

process.env.NODE_ENV = 'production';
process.env.NODE_PATH = __dirname.substring(0, __dirname.length - 4) + '/lib/src';


global.__LIB_VERSION__ = true;
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';


require('../lib/api/api');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .development(__DEVELOPMENT__)
  .server(rootDir, function() {
    require('../lib/src/server');
  });
