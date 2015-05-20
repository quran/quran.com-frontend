require('app-module-path').addPath(__dirname);
require('app-module-path').addPath('./client/scripts');

require('babel/register');

module.exports = require('./server');
