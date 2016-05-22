require('dotenv').load();
require('app-module-path').addPath(__dirname);
require('app-module-path').addPath('./src/scripts');

require("babel-register");

global.__CLIENT__ = false;
global.__SERVER__ = true;


require('nightwatch/bin/runner.js');
