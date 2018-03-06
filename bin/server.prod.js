require('dotenv').load();
require('app-module-path').addPath(__dirname);
require('app-module-path').addPath('../dist');
require('isomorphic-fetch');

const webpackIsomorphicTools = require('webpack-isomorphic-tools');
const path = require('path');

const rootDir = path.resolve(__dirname, '../dist');
// eslint-disable-next-line
global.__CLIENT__ = false;
// eslint-disable-next-line
global.__SERVER__ = true;
// eslint-disable-next-line
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

// eslint-disable-next-line
global.webpack_isomorphic_tools = new webpackIsomorphicTools(
  // eslint-disable-next-line
  require('../webpack/isomorphic-tools-configuration')
)
  .development(__DEVELOPMENT__)
  .server(rootDir, () => {
    // eslint-disable-next-line
    require('../dist/server.js').default();
  });
