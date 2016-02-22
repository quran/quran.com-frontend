var testContext = require.context('./src', true, /(\.spec|spec)\.js$/);
testContext.keys().forEach(testContext);

// var sourceContext = require.context('./src', true, /index\.js$/);
// sourceContext.keys().forEach(sourceContext);
