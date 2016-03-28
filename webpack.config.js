require('dotenv').config({path: (process.env.NODE_ENV || 'development') + '.env'});
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var IsomorphicPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new IsomorphicPlugin(require('./webpack-isomorphic-tools-configuration'));

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
    'webpack-dev-server/client?http://localhost:8001',
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
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' },
      { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' }
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
      'process.env': {
        BROWSER: true,
        API_URL: JSON.stringify(process.env.API_URL),
        CURRENT_URL: JSON.stringify(process.env.CURRENT_URL)
      },
      __SERVER__: false,
      __CLIENT__: true,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),
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
