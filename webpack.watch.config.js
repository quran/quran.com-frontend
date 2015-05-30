var webpack = require("webpack");
var path = require("path");
var config = require("./webpack.config.js");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')

config.cache = true;
config.debug = true;
config.devtool = "cheap-module-eval-source-map";

config.entry.unshift(
	"webpack-dev-server/client?http://localhost:8080",
	"webpack/hot/only-dev-server"
);

config.output.publicPath = "http://localhost:8080/build/";
config.output.hotUpdateMainFilename = "update/[hash]/update.json";
config.output.hotUpdateChunkFilename = "update/[hash]/[id].update.js";

config.plugins = [
	new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"windows.jQuery": "jquery"
	}),
	new ExtractTextPlugin("[name].css", {allChunks: true}),
	new HtmlWebpackPlugin(),
	new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
];

config.module = {
	loaders: [
		{ test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
		{include: /\.json$/, loaders: ["json-loader"]},
		{include: /\.js$/, loaders: ["react-hot", "babel-loader?stage=0&optional=runtime&plugins=typecheck"], exclude: /node_modules/},
		{test: /\.(ttf|eot|svg|woff|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?name=/[name].[ext]"},
		{ test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style-loader',
				'css!sass?outputStyle=expanded&' +
				'includePaths[]=' +
				(path.resolve(__dirname, './node_modules')) + '&' +
				(path.resolve(__dirname, './src/styles/fonts'))
			)
		},
	]
};

config.devServer = {
	publicPath:  "http://localhost:8080/build/",
	contentBase: "./",
	hot:         true,
	inline:      true,
	lazy:        false,
	quiet:       true,
	noInfo:      false,
	historyApiFallback: true,
	headers:     {"Access-Control-Allow-Origin": "*"},
	stats:       {colors: true},
	host:        "0.0.0.0"
};

module.exports = config;
