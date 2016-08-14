require('dotenv').load();
require('app-module-path').addPath(__dirname);
require('app-module-path').addPath('./src');

var path = require('path');
var rootDir = path.resolve(__dirname, '../dist');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

var webpackIsomorphicTools = require('webpack-isomorphic-tools');

global.webpack_isomorphic_tools = new webpackIsomorphicTools(require('../webpack/isomorphic-tools-configuration'))
.development(__DEVELOPMENT__)
.server(rootDir, function() {
  require('../dist/server.js')();
});
