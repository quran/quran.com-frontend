require('dotenv').load();
const webpack = require('webpack');
const path = require('path');
const IsomorphicPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new IsomorphicPlugin(require('./isomorphic-tools-configuration')); // eslint-disable-line max-len, global-require

module.exports = {
  context: path.resolve(__dirname, '..'),
  resolve: {
    extensions: ['', '.js'],
    modules: [
      'src',
      'node_modules'
    ]
  },
  entry: [
    'webpack-hot-middleware/client?path=http://localhost:8001/__webpack_hmr',
    'webpack/hot/only-dev-server',
    'bootstrap-sass!./src/styles/bootstrap.config.js',
    './src/client.js'
  ],
  output: {
    path: path.resolve('./build'),
    publicPath: 'http://localhost:8001/public/',
    filename: 'main.js'
  },
  module: {
    preLoaders: [
      // {
      //   test: /\.js$/,
      //   loader: 'eslint',
      //   exclude: /node_modules|bootstrap\.config/
      // }
    ],
    loaders: [
      { test: /\.json$/, loader: 'json'},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'babel',
            query: {
              plugins: [
                'transform-runtime',
                'add-module-exports',
                'transform-decorators-legacy',
                'transform-react-display-name',
                'typecheck',
              ],
              presets: ['react', ['es2015', {modules: false}], 'stage-0', 'react-hmre'],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?name=images/[name].[ext]&limit=10000&mimetype=image/svg+xml'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?name=images/[name].[ext]&limit=10240'
      },
      {
        test: /\.scss$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' // eslint-disable-line max-len
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.ONE_QURAN_URL': JSON.stringify(process.env.ONE_QURAN_URL),
      'process.env.FACEBOOK_APP_ID': JSON.stringify(process.env.FACEBOOK_APP_ID),
      'process.env.SEGMENTS_KEY': JSON.stringify(process.env.SEGMENTS_KEY),
      'process.env.SENTRY_KEY_CLIENT': JSON.stringify(process.env.SENTRY_KEY_CLIENT),
      'process.env.SENTRY_KEY_SERVER': JSON.stringify(process.env.SENTRY_KEY_SERVER),
      __SERVER__: false,
      __CLIENT__: true,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    webpackIsomorphicToolsPlugin.development()
  ],
  stats: {
    colors: true,
    reasons: true
  },
  devtool: 'source-map',
  keepalive: true,
  debug: true,
  cache: true,
  node: {
    setImmediate: false,
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
