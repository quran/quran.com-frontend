var Webpack_isomorphic_tools = require('webpack-isomorphic-tools');
var Webpack_isomorphic_tools_config_file = require('./webpack-isomorphic-tools-configuration');
// this must be equal to your Webpack configuration "context" parameter
var project_base_path = require('path').resolve(__dirname, './')

// this global variable will be used later in express middleware
module.exports = function(callback) {
	if (!callback) {
		throw Error('Need a callback');
	}

	global.webpack_isomorphic_tools = new Webpack_isomorphic_tools(Webpack_isomorphic_tools_config_file)
	// enter development mode if needed
	// (for example, based on a Webpack DefinePlugin variable)
	.development(process.env.NODE_ENV === 'development')
	// initializes a server-side instance of webpack-isomorphic-tools
	// (the first parameter is the base path for your project)
	.server(project_base_path, callback);
};
