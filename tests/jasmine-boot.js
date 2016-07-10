'use strict';
require.extensions['.scss'] = function () {
  return null;
};

// es6 and jsx support
require("babel-core/register");
require("babel-polyfill");
//settings
var SpecReporter = require('jasmine-spec-reporter');
jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
jasmine.getEnv().addReporter(new SpecReporter({
  displayStacktrace: true
}));
// for client side testing
var jsdom = require('jsdom');
global.document = jsdom.jsdom('<!doctype html><html><body><div id="quran"></div></body></html>');
global.window = document.defaultView;
propagateToGlobal(global.window);

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key]
  }
}

beforeAll(function () {
  //any tasks to run before all tests
});

beforeEach(function () {
  process.env.NODE_ENV = "";
});
