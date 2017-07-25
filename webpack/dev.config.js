require('dotenv').load();
const webpack = require('webpack');
const path = require('path');
const IsomorphicPlugin = require('webpack-isomorphic-tools/plugin');
const isomorphicToolsConfig = require('./isomorphic-tools-configuration');

const webpackIsomorphicToolsPlugin = new IsomorphicPlugin(
  isomorphicToolsConfig
);

const root = path.resolve(__dirname, '..');

module.exports = {
  context: root,
  resolve: {
    extensions: ['.js'],
    modules: ['src', 'node_modules']
  },
  entry: [
    'babel-polyfill',

    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    `bootstrap-loader/lib/bootstrap.loader?configFilePath=${root}/src/styles/bootstrap.config.json!bootstrap-loader/no-op.js`,
    './src/client.js'
  ],
  devServer: {
    hot: true,
    quiet: true,
    noInfo: true,
    inline: true,
    lazy: false,
    stats: 'verbose',

    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    // enable HMR on the server

    contentBase: path.resolve('./build'),
    // match the output path

    publicPath: 'http://localhost:8080/public/'
    // match the output `publicPath`
  },
  output: {
    path: path.resolve('./build'),
    publicPath: 'http://localhost:8080/public/',
    filename: '[name].js',
    chunkFilename: '[name]-chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'react-hot-loader/webpack'
          },
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: [
                'react-hot-loader/babel',
                'transform-runtime',
                // 'add-module-exports',
                'transform-react-display-name',
                'typecheck',
                'react-hot-loader/babel',
                'syntax-dynamic-import'
              ],
              presets: [['es2015', { modules: false }], 'stage-2', 'react'],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?name=images/[name].[ext]&limit=10000&mimetype=image/svg+xml'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?name=images/[name].[ext]&limit=10240'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              sourceMap: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [
                  require('precss'), // eslint-disable-line
                  require('autoprefixer') // eslint-disable-line
                ];
              }
            }
          },
          'sass-loader?outputStyle=expanded&sourceMap'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    // new DashboardPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.ONE_QURAN_URL': JSON.stringify(process.env.ONE_QURAN_URL),
      'process.env.FACEBOOK_APP_ID': JSON.stringify(
        process.env.FACEBOOK_APP_ID
      ),
      'process.env.SEGMENTS_KEY': JSON.stringify(process.env.SEGMENTS_KEY),
      'process.env.SENTRY_KEY_CLIENT': JSON.stringify(
        process.env.SENTRY_KEY_CLIENT
      ),
      'process.env.SENTRY_KEY_SERVER': JSON.stringify(
        process.env.SENTRY_KEY_SERVER
      ),
      __SERVER__: false,
      __CLIENT__: true,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    webpackIsomorphicToolsPlugin.development()
  ],
  stats: {
    colors: true,
    reasons: true,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: true,
    cachedAssets: true,
    depth: true,
    entrypoints: true
  },
  devtool: 'source-map',
  cache: true,
  node: {
    setImmediate: false,
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
