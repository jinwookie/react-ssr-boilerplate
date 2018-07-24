const path = require('path');
const {
  ProvidePlugin,
  DefinePlugin,
} = require('webpack');
const nodeExternals = require('webpack-node-externals');

const DEV = process.env.NODE_ENV !== 'production';
const publicPath = DEV ? 'http://localhost:8080/dist/' : '/dist/';
const filename = '[name].js'; //DEV ? '[name].js' : '[name].[hash].js';

module.exports = {
  target: 'node',
  entry: {
    server: './src/server/App.js'
  },
  output: {
    filename,
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: 'null-loader'
      },
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src/client'),
      'node_modules'
    ],
    extensions: ['.js', '.json', '.jsx', '.scss']
  },
  externals: nodeExternals(),
  plugins: [
    new ProvidePlugin({
      React: 'react'
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      'process.env.BABEL_ENV': JSON.stringify(process.env.BABEL_ENV)
    }),
  ],
  watch: DEV,
  devtool: DEV ? 'cheap-module-eval-source-map' : false,
  mode: DEV ? 'development' : 'production',
};
