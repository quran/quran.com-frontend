require('dotenv').config({path: (process.env.NODE_ENV || 'development') + '.env'});
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')
var webpack_isomorphic_tools_plugin =
  // webpack-isomorphic-tools settings reside in a separate .js file
  // (because they will be used in the web server code too).
  new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools-configuration'))
  // also enter development mode since it's a development webpack configuration
  // (see below for explanation)
  .development()

var webpackConfig = {
  context: path.join(process.env.PWD, './'),
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
  entry: [
    'webpack-dev-server/client?http://localhost:3002',
    'webpack/hot/only-dev-server',
    'bootstrap-sass!./bootstrap-sass.config.js',
    './client.js'
  ],
  output: {
    path: path.resolve('./build'),
    publicPath: '/public/',
    filename: 'main.js'
  },
  module: {
    loaders: [
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
      { test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader',
        'css!sass?outputStyle=expanded&' +
        "includePaths[]=" +
        (path.resolve(__dirname, "./node_modules"))
      )}
    ]
  },
  node: {
    setImmediate: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("[name].css", {allChunks: true}),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    }),
    new webpack.DefinePlugin({
      BROWSER: true,
      'process.env': {
        API_URL: JSON.stringify(process.env.API_URL),
        CURRENT_URL: JSON.stringify(process.env.CURRENT_URL)
      }
    }),
    webpack_isomorphic_tools_plugin
  ],
  externals: {
    'jquery': 'jQuery',
    'jquery': '$',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'keen-js': 'Keen',
    'immutable': 'Immutable',
    'superagent': 'superagent'
  },
  stats: {
    colors: true,
    reasons: true
  },
  devtool: 'source-map',
  keepalive: true,
  debug: true,
  cache: true,
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
// The reason this is here and NOT in .babelrc like it should is because our
// nodejs server picks up babel too and isn't happy with this!
webpackConfig.module.loaders[0].query.plugins.push('react-transform');
webpackConfig.module.loaders[0].query.extra = {
  'react-transform': {
    transforms: [{
      transform: 'react-transform-hmr',
      imports: ['react'],
      locals: ['module']
    },
    {
      "transform": "react-transform-catch-errors",
      "imports": ["react", "redbox-react"]
    }]
  }
};

module.exports = webpackConfig;
