'use strict';
require.extensions['.scss'] = function () {
  return null;
};

global.__CLIENT__ = true;


// es6 and jsx support
require('babel-register');
require("babel-polyfill");
let chai = require('chai');

global.chai = chai;
global.expect = chai.expect;
global.sinon = require('sinon');
global.document = require('jsdom').jsdom('<!doctype html><html><body><div id="quran"></div></body></html>');
global.window = document.defaultView;

cssModulesCompile();
propagateToGlobal(global.window);


chai.use(require('chai-spies'));
chai.use(require("sinon-chai"));



function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key]
  }
}

function cssModulesCompile() {

  let hook = require('css-modules-require-hook');
  let sass = require('node-sass');
  let path = require('path');

  hook({
    extensions: ['.scss'],
    preprocessCss: function (css, filepath) {
      var result =  sass.renderSync({
        data: css,
        includePaths: [ path.resolve(filepath, '..') ]
      });

      return result.css;
    }
  });

}
