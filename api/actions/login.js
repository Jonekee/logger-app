import SystemHelper from '../utils/system';
import { Instance as LoggingManager } from 'logging-manager';

export default function login(req) {
  return new Promise((resolve, reject) => {
    const username = req.body.username;
    const password = req.body.password;

    setTimeout(() => {
      if (!SystemHelper.checkForUser(username)) {
        reject({
          status: 401,
          errorField: 'username',
          errorReason: 'Username inccorect'
        });
      } else {
        SystemHelper.checkUserPassword(username, password)
        .then((matches) => {
          if (matches) {
            const user = {
              username: username
            };
            req.session.user = user;
            resolve(user);
          } else {
            reject({
              status: 401,
              errorField: 'password',
              errorReason: 'Password inccorect'
            });
          }
        }, (error) => {
          LoggingManager.error('Login', 'login', 'Password comparison failed');
          LoggingManager.error('Login', 'login', error);
        });
      }
    }, 2000);
  });
}
