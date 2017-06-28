const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const IsomorphicPlugin = require('webpack-isomorphic-tools/plugin');
const strip = require('strip-loader');
const BabiliPlugin = require('babili-webpack-plugin');

const isomorphicToolsConfig = require('./isomorphic-tools-configuration');

const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackIsomorphicToolsPlugin = new IsomorphicPlugin(
  isomorphicToolsConfig
);

const relativeAssetsPath = '../static/dist';
const assetsPath = path.join(__dirname, relativeAssetsPath);
const root = path.resolve(__dirname, '..');

module.exports = {
  output: {
    path: assetsPath,
    publicPath: process.env.USE_LOCAL_ASSETS
      ? '/public/'
      : '//assets-1f14.kxcdn.com/',
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash]-chunk.js',
    sourceMapFilename: '[name]-[chunkhash].map.js'
  },
  context: path.resolve(__dirname, '../src'),
  devtool: 'cheap-module-source-map',
  target: 'web',
  cache: false,
  entry: [
    `bootstrap-loader/lib/bootstrap.loader?extractStyles&configFilePath=${root}/src/styles/bootstrap.config.prod.json!bootstrap-loader/no-op.js`,
    './client.js'
  ],
  stats: {
    colors: true,
    reasons: false
  },
  resolve: {
    extensions: ['.js'],
    modules: ['src', 'node_modules']
  },
  module: {
    rules: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          strip.loader('debug'),
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ['es2015', { modules: false }],
                'stage-2',
                'react',
                'react-optimize'
              ],
              plugins: [
                'transform-runtime',
                // 'add-module-exports',
                'transform-decorators-legacy',
                'transform-react-display-name',
                'syntax-dynamic-import'
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          //   loader: [
          //     {
          //       loader: 'css-loader',
          //       options: {
          //         modules: true,
          //         importLoaders: 2,
          //         sourceMap: true,
          //         minimize: true,
          //         localIdentName: '[path][name]__[local]--[hash:base64:5]'
          //       }
          //     },
          //     {
          //       loader: 'postcss-loader',
          //       options: {
          //         sourceMap: 'inline',
          //         plugins() {
          //           return [
          //             require('precss'), // eslint-disable-line
          //             require('autoprefixer'), // eslint-disable-line
          //             require('cssnano'), // eslint-disable-line
          //           ];
          //         }
          //       }
          //     },
          //     'sass-loader?sourceMap&sourceMapContents'
          //   ]
          loader:
            'css-loader?minimize&modules&importLoaders=2&sourceMap!autoprefixer-loader?browsers=last 2 version!sass-loader?outputStyle=compressed&sourceMap=true&sourceMapContents=true' // eslint-disable-line max-len
        })
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          'url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          'url-loader?name=images/[name].[ext]&limit=10000&mimetype=image/svg+xml'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?name=images/[name].[ext]&limit=10240'
      }
    ]
  },
  plugins: [
    new CleanPlugin([relativeAssetsPath]),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.SEGMENTS_KEY': JSON.stringify(process.env.SEGMENTS_KEY),
      'process.env.SENTRY_KEY_CLIENT': JSON.stringify(
        process.env.SENTRY_KEY_CLIENT
      ),
      'process.env.SENTRY_KEY_SERVER': JSON.stringify(
        process.env.SENTRY_KEY_SERVER
      ),
      'process.env.FACEBOOK_APP_ID': JSON.stringify(
        process.env.FACEBOOK_APP_ID
      ),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env': {
        NODE_ENV: JSON.stringify('production') // for reach
      },
      __SERVER__: false,
      __CLIENT__: true,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new ExtractTextPlugin({ filename: '[name]-[hash].css', allChunks: true }),

    // Optimizations
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
      debug: true
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    }),
    /**
     * Babli is an ES6+ aware minifier based on the Babel toolchain (beta)
     */
    new BabiliPlugin(),
    webpackIsomorphicToolsPlugin,

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/progressive.js'
    }),

    new SWPrecacheWebpackPlugin({
      cacheId: 'quran-com-frontend',
      maximumFileSizeToCacheInBytes: 8388608,

      // // Ensure all our static, local assets are cached.
      staticFileGlobs: [
        `${relativeAssetsPath}/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}`
      ],

      directoryIndex: '/',
      verbose: true,
      runtimeCaching: [
        {
          urlPattern: /\${process.env.API_URL}\/(.*)/,
          handler: 'networkFirst',
          options: {
            debug: true
          }
        }
      ],
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'quran-com-service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        console.log(message);
      },
      minify: true,
      // For unknown URLs, fallback to the index page
      navigateFallback: '../dist/index.html',
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      // Work around Windows path issue in SWPrecacheWebpackPlugin:
      // https://github.com/facebookincubator/create-react-app/issues/2235
      stripPrefix: `${relativeAssetsPath.replace(/\\/g, '/')}/`
    })
  ]
};
