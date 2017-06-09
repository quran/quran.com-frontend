require('dotenv').load();
require('app-module-path').addPath(__dirname);
require('app-module-path').addPath('../src');

const server = require('../src/server.js');
const fs = require('fs');
const path = require('path');
const piping = require('piping');
const webpackIsomorphicTools = require('webpack-isomorphic-tools');
const webpackIsomorphicToolsConfiguration = require('../webpack/isomorphic-tools-configuration');
const babelRegister = require('babel-register');

const babelrc = fs.readFileSync('./.babelrc');
const rootDir = path.resolve(__dirname, '..');

try {
  const config = JSON.parse(babelrc);
  babelRegister(config);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (!piping({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
  })) {
    return;
  }
}

global.webpack_isomorphic_tools = new webpackIsomorphicTools(webpackIsomorphicToolsConfiguration)
.development(process.env.NODE_ENV === 'development')
.server(rootDir, () => {
  server.default();
});
