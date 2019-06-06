const path = require('path');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map', // This enables source maps for debugging purposes
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(process.cwd(), 'dist/'),
    compress: true,
    open: true,
    port: 8080,
  },
});
