// webpack v4
const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { main: './public/js/main.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/dist'
  },
  target: 'node',
  externals: [nodeExternals()], 
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
        inject: false,
        template: './public/index.html',
        filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
        inject: false,
        template: './public/chat.html',
        filename: 'chat.html'
    }),
    new HtmlWebpackPlugin({
        inject: false,
        template: './public/leave.html',
        filename: 'leave.html'
    }),
    new LinkTypePlugin({
      '**/*.css' : 'text/css'
    })
  ]
};