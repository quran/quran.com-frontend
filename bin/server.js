#!/usr/bin/env node
require('../server.babel'); // babel registration (runtime transpilation for node)
// require('babel-register');
var path = require('path');
var rootDir = path.resolve(__dirname, '..');

require('app-module-path').addPath(rootDir);
require('app-module-path').addPath('../src');
/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
// global.__DISABLE_SSR__ = (process.env.DISABLE_SSR === 'true');  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DISABLE_SSR__ = false;
global.__DEVELOPMENT__ = (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test');
global.__TEST__ = process.env.NODE_ENV === 'test';

if (__DEVELOPMENT__) {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
    return;
  }
}

if (__TEST__) {
  module.exports = function(cb) {
    var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
    global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
      .development(true)
      .server(rootDir, function() {
        server = require('../src/server')(function(serverInstance) {cb(serverInstance);});
      });
  }
}
else {
  var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
  global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
    .development(__DEVELOPMENT__)
    .server(rootDir, function() {
      require('../src/server')();
    });
}
