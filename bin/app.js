#!/usr/bin/env node
/* eslint no-var:0, vars-on-top:0, func-names:0 */

var LoggingManager = require('logging-manager').Instance;
var program = require('commander');
var fs = require('fs');

program
  .version('0.3.0')
  .option('-p, --port [port]', 'Port to run webserver on.')
  .option('-a, --apiport [apiport]', 'Port to run API server on.')
  .option('-c, --config [config]', 'Config file for app and system.')
  .parse(process.argv);

var config;

if (!!program.config) {
  LoggingManager.system('APP', 'main', 'Reading config file...');
  try {
    config = fs.readFileSync(program.config, { encoding: 'utf8' });
  } catch (error) {
    LoggingManager.fatal('APP', 'main', 'Failed to read config file: ' + program.config);
    LoggingManager.fatal('APP', 'main', error);
    process.exit(1);
  }
  try {
    config = JSON.parse(config);
  } catch (error) {
    LoggingManager.fatal('APP', 'main', 'Config file is not valid JSON: ' + program.config);
    LoggingManager.fatal('APP', 'main', error);
    process.exit(1);
  }
  LoggingManager.system('APP', 'main', 'Finished reading config file.');
}


process.env.PORT = program.port || (config && config.port) || 8080;
process.env.APIPORT = program.apiport || (config && config.apiport) || 3030;

LoggingManager.system('APP', 'main', 'Starting app using webserver port: ' + process.env.PORT + ' and API port: ' + process.env.APIPORT);


var path = require('path');
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
