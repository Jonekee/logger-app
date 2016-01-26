require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  authEnabled: false,
  releaseStage: 1,
  app: {
    title: 'Logger',
    description: 'A self-hosted application for remotely watching log files through a web UI.',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'Logger',
        'og:image': 'http://logger-app.github.io/logo.jpg',
        'og:locale': 'en_US',
        'og:title': 'Logger',
        'og:description': 'A self-hosted application for remotely watching log files through a web UI.',
        'twitter:card': 'summary',
        'twitter:site': '@Ross_Court',
        'twitter:creator': '@Ross_Court',
        'twitter:title': 'Logger',
        'twitter:description': 'A self-hosted application for remotely watching log files through a web UI.',
        'twitter:image': 'http://logger-app.github.io/logo.jpg',
        'twitter:image:width': '200',
        'twitter:image:height': '200'
      }
    }
  }
}, environment);
