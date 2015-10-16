var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

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
  headers:     {"Access-Control-Allow-Origin": "*"},
  proxy: {
    '*': { target: 'http://localhost:3001' }
  }
}).listen(3002, function () {
  console.log('Webpack Dev Server listening on port 3002');
});
