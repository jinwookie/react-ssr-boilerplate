const path = require('path');
const {
  ProvidePlugin,
  DefinePlugin
} = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const DEV = process.env.NODE_ENV !== 'production';
const publicPath = DEV ? 'http://localhost:8080/dist/' : '/dist/';
const filename = DEV ? '[name].js' : '[name].[contenthash].js';

const optimization = {
  splitChunks: {
    chunks: 'async',
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
        reuseExistingChunk: true,
      },
    }
  },
  // splitChunks: {
  //   chunks: 'async',
  //   minSize: 30000,
  //   minChunks: 1,
  //   maxAsyncRequests: 5,
  //   maxInitialRequests: 3,
  //   automaticNameDelimiter: '~',
  //   name: true,
  //   cacheGroups: {
  //     vendors: {
  //       test: /[\\/]node_modules[\\/]/,
  //       priority: -10
  //     },
  //     default: {
  //       minChunks: 2,
  //       priority: -20,
  //       reuseExistingChunk: true
  //     }
  //   }
  // }
};

if (!DEV) {
  optimization.minimizer = [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true // set to true if you want JS source maps
    }),
    new OptimizeCSSAssetsPlugin({})
  ];

  optimization.splitChunks.cacheGroups.styles = {
    name: 'styles',
    test: /\.s?css$/,
    chunks: 'all',
    enforce: true
  };
}

module.exports = {
  entry: {
    main: './src/client/index.js'
  },
  output: {
    filename,
    path: path.resolve(__dirname, 'dist'),
    publicPath
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
        use: [
          DEV ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,

            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src/client'),
      'node_modules'
    ],
    extensions: ['.js', '.json', '.jsx', '.scss']
  },
  plugins: [
    new ProvidePlugin({
      React: 'react'
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      'process.env.BABEL_ENV': JSON.stringify(process.env.BABEL_ENV)
    }),
    ...(DEV ? 
      [] :
      [
        new MiniCssExtractPlugin({
          filename: DEV ? '[name].css' : '[name].[contenthash].css'
        }),
        new ManifestPlugin(),
      ]
    )
  ],
  optimization,
  watch: DEV,
  devtool: DEV ? 'cheap-module-eval-source-map' : false,
  mode: DEV ? 'development' : 'production',
  devServer: {
    contentBase: '/dist/',
    publicPath,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    },
  },
};
