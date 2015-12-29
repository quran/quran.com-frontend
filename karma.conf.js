var webpack = require('webpack');
var path = require('path');
var rootDir = path.resolve(__dirname, '.');
require('app-module-path').addPath(rootDir);
require('app-module-path').addPath('../src');

module.exports = function (config) {
  config.set({

    browsers: ['Chrome'],

    singleRun: false,

    frameworks: [ 'mocha', 'chai', 'chai-sinon' ],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'mocha', 'coverage' ],

    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-chai"),
      require("karma-chai-sinon"),
      require("karma-mocha-reporter"),
      require("karma-phantomjs-launcher"),
      require("karma-chrome-launcher"),
      require("karma-sourcemap-loader"),
      require("karma-coverage")
    ],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        // TODO: When using babel 6 throughout the probject.
        // preLoaders: [
               // transpile all files except testing sources with babel as usual
              //  {
              //      test: /\.js$/,
              //      exclude: [
              //          path.resolve('./src/'),
              //          path.resolve('node_modules/')
              //      ],
              //      loader: 'babel?' + JSON.stringify(babelLoaderQuery)
              //  },
               // transpile and instrument only testing sources with isparta
              //  {
              //      test: /\.js$/,
              //      loader: 'isparta'
              //  }
          //  ],
        loaders: [
          { test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: {limit: 10240} },
          { test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
          { test: /\.json$/, loader: 'json-loader' },
          { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' }
        ]
      },
      resolve: {
        modulesDirectories: [
          'src',
          'node_modules'
        ],
        extensions: ['', '.json', '.js']
      },
      plugins: [
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
        })
      ],
    },

    webpackServer: {
      noInfo: true
    }

  });
};
