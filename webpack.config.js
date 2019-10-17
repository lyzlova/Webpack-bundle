const path = require('path');
const webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');

const loadModeConfig = env =>
  require(`./build-utils/${env.mode}.config.js`)(env);

module.exports = env =>
  webpackMerge(
    {
      mode: env.mode,
      context: path.resolve(__dirname, 'src'),
      entry: './index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
      },
      module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
          {
            test: /\.(png|jpg|gif|svg)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  name: '[path]/[name].[ext]',
                  limit: 5000,
                },
              },
            ],
          },
          {
            test: /\.(html)$/,
            use: {
              loader: 'html-loader',
            },
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new WebpackBar(),
      ],
    },
    loadModeConfig(env),
  );
