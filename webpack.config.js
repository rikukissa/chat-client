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
  externals: [{
    irc: 'commonjs irc',
    shell: 'commonjs shell'
  }],
  output: {
    path: path.join(__dirname, './public/built'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:9001/built/'
  },
  devServer: {
    contentBase: './public',
    publicPath: 'http://localhost:9001/built/'
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
        loaders: ['react-hot', 'babel?stage=0'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.styl$/,
        loaders: ['style', 'css', 'autoprefixer?browsers=last 2 versions', 'stylus']
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  }
};
