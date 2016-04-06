require('dotenv').config({path: (process.env.NODE_ENV || 'production') + '.env'});
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var IsomorphicPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new IsomorphicPlugin(require('./webpack-isomorphic-tools-configuration'));

var relativeAssetsPath = './static/dist';
var assetsPath = path.join(__dirname, relativeAssetsPath);

module.exports = {
  output: {
    path: assetsPath,
    publicPath: process.env.USE_LOCAL_ASSETS ? '/public/' : '//assets-1f14.kxcdn.com/',
    filename: '[name]-[hash].js'
  },
  debug: false,
  target: 'web',
  cache: false,
  entry: [
  'bootstrap-sass!./bootstrap-sass.config.js',
  './client.js',
  ],
  stats: {
    colors: true,
    reasons: false
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      'styles': __dirname + '/src/styles',
      'components': __dirname + '/src/scripts/components',
      'actions': __dirname + '/src/scripts/actions',
      'stores': __dirname + '/src/scripts/stores',
      'constants': __dirname + '/src/scripts/constants',
      'mixins': __dirname + '/src/scripts/mixins',
      'configs': __dirname + '/src/scripts/configs',
      'utils': __dirname + '/src/scripts/utils'
    }
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      {
        test: /\.(js|jsx)$/,
        exclude: [/server/, /node_modules/, /tests/],
        loader: 'babel',
        query: {
          stage: 0,
          plugins: []
        }
      },
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    }),
    new ExtractTextPlugin("[name]-[hash].css", {allChunks: true}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        BROWSER: true,
        API_URL: process.env.API_URL,
        CURRENT_URL: process.env.CURRENT_URL,
        NODE_ENV: process.env.NODE_ENV
      }),
      __SERVER__: false,
      __CLIENT__: true,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    webpackIsomorphicToolsPlugin
  ]
};
