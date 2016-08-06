require('dotenv').load();

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var IsomorphicPlugin = require('webpack-isomorphic-tools/plugin')
var strip = require('strip-loader');

var webpackIsomorphicToolsPlugin = new IsomorphicPlugin(require('./isomorphic-tools-configuration'));
var relativeAssetsPath = '../static/dist';
var assetsPath = path.join(__dirname, relativeAssetsPath);

module.exports = {
  output: {
    path: assetsPath,
    publicPath: process.env.USE_LOCAL_ASSETS ? '/public/' : '//assets-1f14.kxcdn.com/',
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    sourceMapFilename: '[name]-[chunkhash].map.js'

  },
  devtool: 'cheap-source-map',
  debug: false,
  target: 'web',
  cache: false,
  entry: [
  'bootstrap-sass!./bootstrap.config.prod.js',
  './client.js',
  ],
  stats: {
    colors: true,
    reasons: false
  },
  resolve: {
    extensions: ['', '.js'],
    modules: [
      'src',
      'node_modules'
    ]
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.js$/, exclude: /node_modules/, loaders: [
        strip.loader('debug'),
        {
          loader: 'babel',
          query: {
            'presets': ['react', ['es2015', {'modules': false}], 'stage-0'],
            'plugins': [
              'transform-runtime',
              'add-module-exports',
              'transform-decorators-legacy',
              'transform-react-display-name'
            ]
          }
        }
      ]},
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.scss$/, loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style',
        loader: 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
      }) },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream" },
      { test: /\.otf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=images/[name].[ext]&limit=10000&mimetype=image/svg+xml" },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?name=images/[name].[ext]&limit=10240' }
    ]
  },
  plugins: [
    new CleanPlugin([relativeAssetsPath]),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    }),
    new ExtractTextPlugin({ filename: '[name]-[hash].css', allChunks: true }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.SEGMENTS_KEY': JSON.stringify(process.env.SEGMENTS_KEY),
      'process.env.SENTRY_KEY_CLIENT': JSON.stringify(process.env.SENTRY_KEY_CLIENT),
      'process.env.SENTRY_KEY_SERVER': JSON.stringify(process.env.SENTRY_KEY_SERVER),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __SERVER__: false,
      __CLIENT__: true,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),

    // Optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      minimize: true
		}),
    new webpack.LoaderOptionsPlugin({
      test: /\.css$/, // optionally pass test, include and exclude, default affects all loaders
      minimize: true,
      debug: false
    }),
    webpackIsomorphicToolsPlugin
  ]
};
