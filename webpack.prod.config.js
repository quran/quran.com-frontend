var ExtractTextPlugin = require('extract-text-webpack-plugin'),
path = require('path'),
webpack = require('webpack');

module.exports = {
  output: {
    path: './build',
    publicPath: '/public/',
    filename: '[name].js'
  },
  debug: false,
  devtool: 'eval',
  target: 'web',
  entry: [
  'bootstrap-sass!./bootstrap-sass.config.js',
  './client.js',
  './src/styles/main.scss'
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
          'css!sass?outputStyle=expanded&' +
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
    new ExtractTextPlugin("[name].css", {allChunks: true}),
    new webpack.OldWatchingPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],

};
