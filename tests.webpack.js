require('babel-polyfill');
var testContext = require.context('./src', true, /(\.spec|spec)\.js$/);
testContext.keys().forEach(testContext);
