import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import {mapUrl} from 'utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import TailHelper from 'utils/tailhelper.js';

// const tailHelper = new TailHelper();
const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 }
}));
app.use(bodyParser.json());


app.use((req, res) => {
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
          console.error('API ERROR:', pretty.render(reason));
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
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });

  io.on('connection', (socket) => {
    socket.emit('news', {msg: `'Hello World!' from server`});

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
      console.log('SOCKET attachLogListener: ' + JSON.stringify(data));
      TailHelper.attachListener(io, socket, data.groupId, data.logId);
      socketSessions[socket.id].push({
        groupId: data.groupId,
        logId: data.logId
      });
    });

    socket.on('detachLogListener', data => {
      console.log('SOCKET attachLogListener: ' + JSON.stringify(data));
      TailHelper.detachListener(socket, data.groupId, data.logId);
      let toRemove;
      socketSessions[socket.id].forEach((item, index) => {
        if ((item.groupId === data.groupId) && (item.logId === data.logId)) {
          toRemove = index;
        }
      });
      if (toRemove) {
        socketSessions[socket.id].splice(toRemove, 1);
      }
    });

    socket.on('disconnect', () => {
      console.log('SOCKET disconnected');
      socketSessions[socket.id].forEach((item) => {
        TailHelper.detachListener(socket, item.groupId, item.logId);
      });
      delete(socketSessions[socket.id]);
    });
  });
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
