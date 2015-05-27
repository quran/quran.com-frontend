var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var webpack = require('gulp-webpack-build');
var path = require('path');
var del = require('del');
var webpackConfigPath = './webpack.config.js';
var WebpackDevServer = require("webpack-dev-server");
var webpack = require('webpack');
var webpackConfig = require("./webpack.config.js");
var webpackProConfig = require("./webpack.prod.config.js");


gulp.task('default', ['clean', 'server', 'webpack:build-dev']);

gulp.task('clean', function (cb) {
    del(['build'], cb);
});

gulp.task('server', function () {
    nodemon({
      script: './start.js',
      ignore: ['build/**', 'node_modules/**'],
      ext: 'js'
    });
});

gulp.task('webpack:dev', ['clean'], function() {
  return gulp.src(path.resolve(webpackConfigPath))
    .pipe(webpack.overrides({
      useMemoryFs: true,
      progress: true
    }))
    .pipe(webpack.compile())
    .pipe(webpack.format({
        version: false,
        timings: true
    }))
    .pipe(webpack.failAfter({
      errors: true,
      warnings: true
  }))
});

gulp.task('watch', ['default'], function() {
  gulp.watch(['client/**/*.{js,scss}'], ['webpack:build-dev']);
});


gulp.task("webpack:build-dev", function(callback) {
  var devCompiler = webpack(webpackConfig);
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task('build', function(callback) {
  var prodCompiler = webpack(webpackProConfig);

  prodCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});
