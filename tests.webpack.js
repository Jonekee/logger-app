/* eslint no-var:0 */
var context = require.context('./src', true, /-test\.js$/);
context.keys().forEach(context);
