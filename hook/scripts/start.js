const path = require('path');
const fs = require('fs');

const chalk = require('chalk');

const webpack = require('webpack');
const merge = require('webpack-merge');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const WebpackDevServer = require('webpack-dev-server');
const opn = require('opn');

const { resolveApp, resolveModule } = require('./paths');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.Host || '0.0.0.0';


const baseConfig = {};

const Config = {
  // mode: 'development',
  mode: 'production',

  entry: {
    main: resolveModule(resolveApp, 'src/index'),
    react: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'redux',
      'react-redux',
      'redux-saga',
    ],
  },

  output: {
    filename: '[name].[hash:5].js',
    chunkFilename: '[name].[chunkhash:5].js',
    path: resolveApp('dist'),
    publicPath: '',
  },

  resolve: {
    alias: {
      "@": resolveApp('src'),
    },
    extensions: [
      '.ts',
      '.tsx',
      '.jsx',
      '.mjs',
      '.js',
      '.json',
    ],
  },

  optimization: {
    // Runtime
    runtimeChunk: {
      name: 'runtime',
    },

    // Minify
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true, // Enable/disable file caching.
        parallel: true, // Enable/disable multi-process parallel running.
        sourceMap: false,
        extractComments: false, // Enable/disable extracting comments.
        uglifyOptions: {
          output: {
            comments: false,
          }
        }
      }),

      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          autoprefixer: false,
          sourcemap: true,
          discardComments: true,
          safe: true,
        }
      }),
    ],

    // Tree Shaking
    usedExports: true,

    // Code Splitting
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        react: {
          test: 'react',
          priority: 1,
          chunks: 'initial',
          name: 'react',
          enforce: true,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        },
      },
    },
  },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                "target": "es5",
                "module": "es6",
              },
            },
            exclude: /^(node_modules|bower_components|scripts|dist|public)$/,
          },
          {
            test: /icon\/([0-9a-zA-Z_-]+)\.svg$/,
            use: [
              '@svgr/webpack',
              'url-loader',
            ],
          },
        ],
      },
    ],
  },
}

// export default Config;

module.exports = merge(baseConfig, Config);
