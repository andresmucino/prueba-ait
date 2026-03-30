const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 5000,
    client: {
      overlay: false,
    },
  },
  output: {
    publicPath: 'auto'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{ test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        navbar: 'navbar@http://localhost:5001/remoteEntry.js',
        characters: 'dashboard@http://localhost:5002/remoteEntry.js',
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