#!/usr/bin/env node
var LoggingManager = require('logging-manager').Instance;
LoggingManager.setLogLevel(process.env.NODE_ENV === 'production' ? 'ERROR' : 'TRACE');
global.__CONFIG_FILE__ = './system.json';

if (process.env.NODE_ENV !== 'production') {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json$)/i
  })) {
    return;
  }
}
require('../server.babel'); // babel registration (runtime transpilation for node)
require('../api/api');
