'use strict';

var path = require('path');
var webpack = require('webpack');
var extend = require('lodash').extend;

var production = process.env.NODE_ENV === 'production';

var entries = ['./src/index'];

var plugins = [
  require('webpack-notifier')
];

if(!production) {
  entries = [
    'webpack-dev-server/client?http://localhost:9001',
    'webpack/hot/only-dev-server'
  ].concat(entries);

  plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ].concat(plugins);
}

module.exports = {
  devtool: 'inline-source-map',
  entry: entries,
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: plugins,
  resolve: {
    modulesDirectories: ['./src', './node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.styl$/,
        loaders: ['style', 'css', 'stylus']
      }
    ]
  }
};
