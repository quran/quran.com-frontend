require('dotenv').load();
require('app-module-path').addPath(__dirname);
require('app-module-path').addPath('../dist');

var server = require('../dist/server.js');
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var WebpackIsomorphicToolsConfiguration = require('../webpack/isomorphic-tools-configuration');
var path = require('path');

var rootDir = path.resolve(__dirname, '../dist');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

global.webpack_isomorphic_tools = new WebpackIsomorphicTools(WebpackIsomorphicToolsConfiguration)
.development(__DEVELOPMENT__)
.server(rootDir, () => {
  server.default();
});
