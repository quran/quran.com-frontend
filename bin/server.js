require('dotenv').load();
require('app-module-path').addPath(__dirname);
require('app-module-path').addPath('../src');
require('isomorphic-fetch');

var fs = require('fs');
var path = require('path');
var webpackIsomorphicTools = require('webpack-isomorphic-tools');
var babelrc = fs.readFileSync('./.babelrc');
var rootDir = path.resolve(__dirname, '..');
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

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

global.webpack_isomorphic_tools = new webpackIsomorphicTools(require('../webpack/isomorphic-tools-configuration'))
  .development(process.env.NODE_ENV === 'development')
  .server(rootDir, function() {
    require('../src/server.js').default();
  });
