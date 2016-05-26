var webpack = require('webpack');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    plugins: [
      'karma-sourcemap-loader',
      'karma-mocha',
      'karma-chai-sinon',
      'karma-sinon',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher'
    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai-sinon', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './tests/polyfill/Event.js',
      {pattern: 'static/images/*', watched: false, included: false, served: true},

      // Actual tests here
      'tests.webpack.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    proxies: {
      '/images': __dirname + '/static/images',
      '/images/': __dirname + '/static/images/',
    },

    proxyValidateSSL: false,

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessors

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    webpack: {
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      resolve: {
        modulesDirectories: [
          'src',
          'node_modules'
        ],
        extensions: ['', '.json', '.js']
      },

      module: {
        loaders: [
          {
            test: /\.(js|jsx)$/,
            exclude: [/server/, /node_modules/, /tests/],
            loader: 'babel'
          },
          { test: /\.json$/, loader: 'json-loader'},
          { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' },
          { test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: {limit: 10240} }
        ]
      },

      devtool: 'inline-source-map',

      node: {
        // karma watches test/unit/index.js
        // webpack watches dependencies of test/unit/index.js
        fs: 'empty'
      },

      plugins:[
        new webpack.DefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
        })
      ],

      watch: true
    },

    webpackMiddleware: { noInfo: true },

    client: {
      mocha: {
        globals: []
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    junitReporter: {
      outputFile: 'test-results.xml',
      suite: ''
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome', 'PhantomJS'],
    browsers: ['Chrome'],

    // webpack means that PhantomJS sometimes does not respond in time
    browserNoActivityTimeout: 120000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
