const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/client/index.html'),
  filename: 'index.html',
  inject: 'body',
});

const UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  beautify: false,
  mangle: {
    screw_ie8: true,
  },
  compress: {
    screw_ie8: true,
  },
  comments: false,
});

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production') });

const CleanWebpackPluginConfig = new CleanWebpackPlugin(['./client/build']);

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    path.join(__dirname, '/client/index.jsx'),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/client/build'),
  },
  plugins: [
    HtmlWebpackPluginConfig,
    UglifyJsPluginConfig,
    DefinePluginConfig,
    CleanWebpackPluginConfig,
  ],
};
