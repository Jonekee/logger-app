#!/usr/bin/env node
/* eslint no-var:0, vars-on-top:0, func-names:0 */

var program = require('commander');
var path = require('path');
var fs = require('fs');

var defaultWebPort = 8080;
var defaultAPIPort = 8080;
var defaultLogLevel = 'ERROR';

program
  .version('0.7.0')
  .option('-p, --port [port]', 'Port to run webserver on.')
  .option('-a, --apiport [apiport]', 'Port to run API server on.')
  .option('-l, --loglevel [loglevel]', 'Log level to output.')
  .option('-c, --config [config]', 'Config file for app and system.')
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

if (!!program.config) {
  LoggingManager.system('APP', 'main', 'Using custom config file');
  configFile = program.config;
} else {
  LoggingManager.system('APP', 'main', 'Using pre-packaged config file');
  configFile = './system.json';
}

// Set configFile reference for use by the servers later on
global.__CONFIG_FILE__ = configFile;

LoggingManager.system('APP', 'main', 'Reading config file: ' + configFile);

// Read file
try {
  config = fs.readFileSync(configFile, { encoding: 'utf8' });
} catch (error) {
  LoggingManager.fatal('APP', 'main', 'Failed to read config file.');
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
if (!program.port && !(config && config.port)) {
  LoggingManager.system('APP', 'main', 'Warning! No webserver port value found in config file, using default value: ' + defaultWebPort);
}
if (!program.apiport && !(config && config.apiport)) {
  LoggingManager.system('APP', 'main', 'Warning! No API server port value found in config file, using default value: ' + defaultAPIPort);
}
if (!program.loglevel && !(config && config.loglevel)) {
  LoggingManager.system('APP', 'main', 'Warning! No log level value found in config file, using default value: ' + defaultLogLevel);
}


// Set values or defaults:
process.env.PORT = program.port || (config && config.port) || defaultWebPort;
process.env.APIPORT = program.apiport || (config && config.apiport) || defaultAPIPort;
LoggingManager.setLogLevel(program.loglevel || (config && config.loglevel) || defaultLogLevel);


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
