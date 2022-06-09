const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    path: path.join(__dirname, './dist/js'),
    filename: '[name]-bundle-[contenthash:8].js',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    host: '0.0.0.0',
    port: '8000',
  },
});
