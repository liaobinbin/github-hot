const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EsLintPlugin = require('eslint-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
  resolve: {
    modules: ['node_modules', path.join(__dirname, '../src')],
    extensions: ['.tsx', '.ts', '.js', '.json'],
    plugins: [
      // from tsconfig get alias
      new TsconfigPathsPlugin({
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      }),
    ],
  },
  entry: path.join(__dirname, '../src/App.tsx'),
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'babel-loader',
      },
      {
        type: 'asset',
        test: /\.(png|svg|jpg|jpeg|gif|bmp)$/i,
      },
    ],
  },
  plugins: [
    new EsLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'React + Typescript Project',
      template: path.join(__dirname, '../public/index.html'),
      filename: 'index.html',
    }),
  ],
};
