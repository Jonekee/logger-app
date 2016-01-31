#!/usr/bin/env node
/* eslint no-var:0, vars-on-top:0, func-names:0 */
var path = require('path');
var rootDir = path.resolve(__dirname, '..');

process.env.NODE_ENV = 'production';
process.env.NODE_PATH = __dirname.substring(0, __dirname.length - 4) + '/lib/src';
process.env.APIPORT = 3030;
process.env.PORT = 8080;


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
