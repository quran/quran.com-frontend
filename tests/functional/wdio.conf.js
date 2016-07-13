exports.config = {

  maxInstances: 4,
  host: '127.0.0.1',
  port: 4444,
  sync: false,
  specs: [
    './tests/functional/specs/**/*.js'
  ],
  exclude: [
  ],

  capabilities: [
    {
      browserName: 'phantomjs'
    }
  ],

  logLevel: 'error',
  coloredLogs: true,
  screenshotPath: './errorShots/',

  waitforTimeout: 10000,
  framework: 'mocha',
  reporter: 'spec',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
    expectationResultHandler: function(passed, assertion) {
    }
  },
  onPrepare: function() {
  },
  before: function() {

    var chai = require('chai');
    global.chai = chai;
    global.expect = chai.expect;

    process.on('unhandledRejection', function unhandledRejection(e) {
      console.error(e);
      if (e.stack) {
        console.error(e.stack);
      }
    });

    require("babel-core/register");
    require("babel-polyfill");
  }
};
