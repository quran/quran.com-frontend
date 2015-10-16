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

var Webpack_isomorphic_tools = require('webpack-isomorphic-tools')

// this must be equal to your Webpack configuration "context" parameter
var project_base_path = require('path').resolve(__dirname, './')

// this global variable will be used later in express middleware
global.webpack_isomorphic_tools = new Webpack_isomorphic_tools(require('./webpack-isomorphic-tools-configuration'))
// enter development mode if needed
// (for example, based on a Webpack DefinePlugin variable)
.development(process.env.NODE_ENV === 'development')
// initializes a server-side instance of webpack-isomorphic-tools
// (the first parameter is the base path for your project)
.server(project_base_path, function()
{
  // webpack-isomorphic-tools is all set now.
  // here goes all your web application code:
  require('./server')
})

// module.exports = require('./server');
