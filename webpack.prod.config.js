require('dotenv').config({path: (process.env.NODE_ENV || 'production') + '.env'});
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')
var webpack_isomorphic_tools_plugin = new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools-configuration'));

module.exports = {
  output: {
    path: './build',
    publicPath: '//assets-1f14.kxcdn.com/',
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
      { test: /\.js$/, exclude: /node_modules/, loader: require.resolve('babel-loader') },
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.(png|svg|jpg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.(ttf|eot|svg|woff|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?name=/[name].[ext]"},
      { test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader',
          'css!autoprefixer!sass?outputStyle=expanded&' +
          "includePaths[]=" +
          (path.resolve(__dirname, "./node_modules"))
          )
      }
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
      BROWSER: true,
      'process.env': {
        API_URL: JSON.stringify(process.env.API_URL),
        CURRENT_URL: JSON.stringify(process.env.CURRENT_URL)
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    webpack_isomorphic_tools_plugin
  ]
};
