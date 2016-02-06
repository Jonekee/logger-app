require('babel-polyfill');

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
  releaseStage: 0,
  app: {
    title: 'Logger',
    description: 'A self-hosted application for remotely watching log files through a web UI.',
    head: {
      titleTemplate: 'Logger - %s',
      meta: [
        {name: 'description', content: 'A self-hosted application for remotely watching log files through a web UI.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Logger'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Logger'},
        {property: 'og:description', content: 'A self-hosted application for remotely watching log files through a web UI.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@Ross_Court'},
        {property: 'og:creator', content: '@Ross_Court'},
        {property: 'og:image', content: 'http://logger-app.github.io/logo.jpg'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  }
}, environment);
