require('dotenv').config({path: (process.env.NODE_ENV || 'development') + '.env'});
require('app-module-path').addPath(__dirname);
require('app-module-path').addPath('./src/scripts');

require("babel/register")({
	stage: 0,
	plugins: ["typecheck"]
});

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
    return;
  }
}

require('./webpack-isomorphic-tools-main')(function() {
  require('./server.js')();
});
