import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import {mapUrl} from './utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import SystemHelper from './utils/system.js';
import TailHelper from './utils/tailhelper.js';
import { Instance as LoggingManager } from 'logging-manager';

// const tailHelper = new TailHelper();
const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

SystemHelper.setSocketIo(io);

app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 }
}));
app.use(bodyParser.json());


app.use((req, res) => {
  LoggingManager.trace('API', 'main', 'Incoming API request at URL: ' + req.url);
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  const {action, params} = mapUrl(actions, splittedUrlPath);

  if (action) {
    action(req, params)
      .then((result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          LoggingManager.error('API', 'main', 'API error:');
          LoggingManager.error('API', 'main', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});


const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

const socketSessions = {};

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      LoggingManager.fatal('API', 'main', 'Error starting API server.');
      LoggingManager.fatal('API', 'main', err);
      process.exit(1);
    }
    LoggingManager.system('API', 'main', 'API is running on port ' + config.apiPort);
    LoggingManager.system('API', 'main', 'Send requests to http://' + config.apiHost + ':' + config.apiPort);
  });

  io.on('connection', (socket) => {
    LoggingManager.trace('API', 'main', 'SOCKET connected');

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', (data) => {
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });

    socketSessions[socket.id] = [];

    socket.on('attachLogListener', data => {
      LoggingManager.trace('API', 'main', 'SOCKET attachLogListener: ' + JSON.stringify(data));
      TailHelper.attachListener(io, socket, data.logId);
      socketSessions[socket.id].push({
        logId: data.logId
      });
    });

    socket.on('detachLogListener', data => {
      LoggingManager.trace('API', 'main', 'SOCKET detachLogListener: ' + JSON.stringify(data));
      TailHelper.detachListener(socket, data.logId);
      let toRemove;
      socketSessions[socket.id].forEach((item, index) => {
        if (item.logId === data.logId) {
          toRemove = index;
        }
      });
      // Have to explictly check !== undefined here because toRemove === 0 is a valid result
      if (toRemove !== undefined) {
        socketSessions[socket.id].splice(toRemove, 1);
      }
    });

    socket.on('disconnect', () => {
      LoggingManager.trace('API', 'main', 'SOCKET disconnected');
      socketSessions[socket.id].forEach((item) => {
        TailHelper.detachListener(socket, item.logId);
      });
      delete(socketSessions[socket.id]);
    });
  });
  io.listen(runnable);
} else {
  LoggingManager.fatal('API', 'main', 'No PORT environment variable has been specified');
  process.exit(1);
}
