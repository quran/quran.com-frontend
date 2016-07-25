const browser = process.env.BROWSERNAME || 'phantomjs';

exports.config = {

  maxInstances: 4,
  sync: true,
  specs: [
    './tests/functional/specs/**/*.js'
  ],
  exclude: [
  ],

  capabilities: [
    {
      browserName: browser
    }
  ],

  logLevel: 'error',
  coloredLogs: true,
  screenshotPath: './errorShots/',

  waitforTimeout: 10000,
  framework: 'mocha',
  reporters: ['dot', 'spec'],
  onPrepare: () => {
  },
  before: () => {

    const chai = require('chai'); // eslint-disable-line global-require
    global.chai = chai;
    global.expect = chai.expect;

    process.on('unhandledRejection', (e) => {
      console.error(e);
      if (e.stack) {
        console.error(e.stack);
      }
    });

    require('babel-core/register'); // eslint-disable-line global-require
    require('babel-polyfill'); // eslint-disable-line global-require
  }
};
