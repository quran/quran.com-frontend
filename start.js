require('babel-core/register')({
	presets: [
		'es2015',
		'stage-0',
		'react'
	],
	plugins: [
		'typecheck',
		'transform-object-assign'
	]
});

require('dotenv').config({path: (process.env.NODE_ENV || 'development') + '.env'});
require('app-module-path').addPath(__dirname);
require('app-module-path').addPath('./src/scripts');

var witm = require('./webpack-isomorphic-tools-main');

global.__CLIENT__ = false;
global.__SERVER__ = true;

witm(function() {
	var server = require('./server');

	server.default();
});
