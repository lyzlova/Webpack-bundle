const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => ({
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    stats: 'errors-only',
    port: 8080,
    historyApiFallback: true,
    // noInfo: true,
    quiet: true,
    clientLogLevel: 'warning',
    open: true
  },
});
