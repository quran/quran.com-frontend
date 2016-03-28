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
      'node_modules/babel-core/browser-polyfill.js',
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './tests/polyfill/Event.js',
      {pattern: "static/images/*", watched: false, included: false, served: true},

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
      resolve: {
        root: [
          __dirname + '/node_modules',
          __dirname + '/test/client'
        ],
        alias: {
          'components': __dirname + '/src/scripts/components',
          'actions': __dirname + '/src/scripts/actions',
          'stores': __dirname + '/src/scripts/stores',
          'constants': __dirname + '/src/scripts/constants',
          'mixins': __dirname + '/src/scripts/mixins',
          'configs': __dirname + '/src/scripts/configs',
          'utils': __dirname + '/src/scripts/utils'
        },
        extensions: ['', '.js', '.jsx']
      },

      module: {
        loaders: [
          { test: /\.js?$/, exclude: [/node_modules/], loader: 'babel-loader' }
        ]
      },

      devtool: 'inline-source-map',

      node: {
        // karma watches test/unit/index.js
        // webpack watches dependencies of test/unit/index.js
        fs: "empty"
      },

      plugins:[
        //only include moment.js 'en' locale
        // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
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
