require('dotenv').load();
require('app-module-path').addPath(__dirname);
require('app-module-path').addPath('../src');
require('isomorphic-fetch');

const fs = require('fs');
const path = require('path');
const webpackIsomorphicTools = require('webpack-isomorphic-tools');

const babelrc = fs.readFileSync('./.babelrc');
const rootDir = path.resolve(__dirname, '..');
let config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-register')(config);

// eslint-disable-next-line
global.__CLIENT__ = false;
// eslint-disable-next-line
global.__SERVER__ = true;
// eslint-disable-next-line
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (
    // eslint-disable-next-line
    !require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })
  ) {
    return;
  }
}
// eslint-disable-next-line
global.webpack_isomorphic_tools = new webpackIsomorphicTools(
  // eslint-disable-next-line
  require('../webpack/isomorphic-tools-configuration')
)
  .development(process.env.NODE_ENV === 'development')
  .server(rootDir, () => {
    // eslint-disable-next-line
    require('../src/server.js').default();
  });
