'use strict';
require.extensions['.scss'] = function () {
  return null;
};
// es6 and jsx support
require('babel-register');
require("babel-polyfill");
var chai = require('chai');

global.chai = chai;
global.expect = chai.expect;
global.sinon = require('sinon');
chai.use(require('chai-spies'));
chai.use(require("sinon-chai"));

global.document = require('jsdom').jsdom('<!doctype html><html><body><div id="quran"></div></body></html>');
global.window = document.defaultView;
propagateToGlobal(global.window);

global.__CLIENT__ = true;


function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key]
  }
}
