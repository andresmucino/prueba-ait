const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv');
const { ModuleFederationPlugin } = require('webpack').container;
const { DefinePlugin } = require('webpack');

const env = dotenv.config({ path: path.resolve(__dirname, '.env') }).parsed || {};

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 5002,
  },
  output: {
    publicPath: 'auto'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'characters',
      filename: 'remoteEntry.js',
      exposes: {
        './characters': './src/App.jsx',
      },
      shared: {
        react: { singleton: true, eager: false, requiredVersion: '19.2.4' },
        'react-dom': { singleton: true, eager: false, requiredVersion: '19.2.4' }
      }
    }),
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify(env.API_URL || ''),
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV || 'development')
    }),
    new HtmlWebpackPlugin({
      templateContent: '<html><body><div id="root"></div></body></html>',
    }),
  ],
};