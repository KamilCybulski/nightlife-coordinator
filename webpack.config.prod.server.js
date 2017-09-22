const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './server/index.js'],
  target: 'node',
  output: {
    path: path.join(__dirname, '/server/build'),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.js'],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production') }),
    new CleanWebpackPlugin(['./server/build']),
  ],
};
