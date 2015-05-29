require('app-module-path').addPath(__dirname);
require('app-module-path').addPath('./src/scripts');

require("babel/register")({
	stage: 0,
	plugins: ["typecheck"]
});

global.__CLIENT__ = false;
global.__SERVER__ = true;

if (process.env.NODE_ENV !== "production") {
	if (!require("piping")({hook: true})) {
		return;
	}
}

module.exports = require('./server');
