const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 5001,
    client: {
      overlay: false,
    },
    headers: {
      'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; connect-src 'self' ws://localhost:* http://localhost:* https://*.googleusercontent.com;",
    },
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
      name: 'navbar',
      filename: 'remoteEntry.js',
      exposes: {
        './navbar': './src/App.jsx',
      },
      shared: {
        react: { singleton: true, eager: false, requiredVersion: '19.2.4' },
        'react-dom': { singleton: true, eager: false, requiredVersion: '19.2.4' }
      }
    }),
    new HtmlWebpackPlugin({
      templateContent: '<html><body><div id="root"></div></body></html>',
    }),
  ],
};