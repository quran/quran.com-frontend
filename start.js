require('dotenv').load();
require('app-module-path').addPath(__dirname);
require('app-module-path').addPath('./src');

var fs = require('fs');
var babelrc = fs.readFileSync('./.babelrc');
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

config.plugins.push(['system-import-transformer', {modules: 'common'}]);

require('babel-register')(config);

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
    return;
  }
}

var webpackIsomorphicTools = require('webpack-isomorphic-tools');
// this must be equal to your Webpack configuration "context" parameter
var rootPath = require('path').resolve(__dirname, './')

global.webpack_isomorphic_tools = new webpackIsomorphicTools(require('./webpack/isomorphic-tools-configuration'))
.development(process.env.NODE_ENV === 'development')
.server(rootPath, function() {
  require('./server.js')();
});
