var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: [
      'bootstrap-sass!./bootstrap-sass.config.js',
      './client.js',
    ],
    output: {
        path: require("path").resolve("./build"),
        publicPath: '/public/',
        filename: '[name].js'
    },
    resolve: {
      extensions: ['', '.js'],
      alias: {
        'styles': __dirname + '/src/styles',
        'components': __dirname + '/src/scripts/components',
        'actions': __dirname + '/src/scripts/actions',
        'stores': __dirname + '/src/scripts/stores',
        'constants': __dirname + '/src/scripts/constants',
        'mixins': __dirname + '/src/scripts/mixins',
        'configs': __dirname + '/src/scripts/configs',
        'utils': __dirname + '/src/scripts/utils'
      }
    },
    module: {
      loaders: [
        { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
        { test: /\.css$/, loader: 'style!css' },
        { test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', require.resolve('babel-loader'), "eslint-loader"] },
        { test: /\.json$/, loader: 'json-loader'},
        { test: /\.(png|svg|jpg)$/, loader: 'url-loader?limit=8192' },
        { test: /\.(ttf|eot|svg|woff|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?name=/[name].[ext]"},
        { test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style-loader',
            'css!autoprefixer!sass?outputStyle=expanded&' +
              "includePaths[]=" +
                (path.resolve(__dirname, "./node_modules"))
          )
        },

      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "windows.jQuery": "jquery"
      }),
      new ExtractTextPlugin("[name].css", {allChunks: true}),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.OldWatchingPlugin()
    ],
    stats: {
      colors: true,
      reasons: true
    },
    externals: {
      'jquery': 'jQuery',
      'react': 'react'
    },
    devtool: 'source-map',
    watch: false,
    keepalive: true,
    debug: true,
    cache: true,
};
