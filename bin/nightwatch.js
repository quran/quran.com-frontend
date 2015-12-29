#!/usr/bin/env node
var path = require('path');
var rootDir = path.resolve(__dirname, '.');

require('app-module-path').addPath(rootDir);
require('app-module-path').addPath('./src');

require('nightwatch/bin/runner.js');
