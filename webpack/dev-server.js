const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./dev.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  stats: {
    assets: true,
    colors: true,
    version: true,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: false
  },
  verbose: true,
  cache: true,
  inline: true,
  debug: true,
  headers: {'Access-Control-Allow-Origin': '*'},
  proxy: {
    '*': { target: 'http://localhost:8000' }
  }
}).listen(8080, () => console.info('==> 💻  Webpack Dev Server at http://localhost:8080'));
