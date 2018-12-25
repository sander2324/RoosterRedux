const path = require('path');

// Require some handy plugins
const CleanWebpackPlugin = require('clean-webpack-plugin'); // Used to clean the dist folder on every build.
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Used to inject the correct script tags inside index.html
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // Used to bundle styles together.
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // Can't beat that name! Used to optimize generated css for size.
const TerserPlugin = require('terser-webpack-plugin'); // Used to optimize bundled javascript for size.

// Behold! The mighty Webpack config!
module.exports = {
  entry: {
    // Start looking for things to bundle/optimize from here. Webpack will look for require/import calls.
    app: './src/js/script.js',
  },
  output: {
    // Put bundled javascript inside the dist folder
    path: path.resolve(process.cwd(), 'dist/'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js' // We need this for now to support Vue syntax (like v-for) in html files. Migrating to .vue files is highly recommended.
    }
  },
  module: {
    // Rules define which files get a makeover by Webpack!
    rules: [{
      test: /\.js$/, // All javascript files
      exclude: /node_modules/, // Exclude javascript files from libraries from optimization because this is slow!
      use: [
        'babel-loader', // Babel is a compiler that let us write modern javascript (ES6). It will transpile modern javascript to a more compatible variant called ES5.
      ],
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ],
    }, {
      test: /\.(eot|ttf|woff|woff2|svg)$/, // Matches fonts & svg files.
      use: {
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]', // Put these files inside a subfolder called 'assets' inside the dist folder.
        },
      },
    }],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // This will ensure that all libraries are bundled into a seperate file.
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      // Optimize javascript
      new TerserPlugin({
        cache: true,
        parallel: true, // Take advantage of those cpu cores!
      }),
      // Optimize CSS
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    // Clean the dist folder
    new CleanWebpackPlugin(['dist'], {
      root: process.cwd(),
    }),
    // Take src/index.html as base and inject script tags to make things work!
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'src/index.html'),
    }),
    // Bundle css
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  // Dev server configuration.
  devServer: {
    contentBase: path.resolve(process.cwd(), 'dist/'),
    compress: true,
    port: 8080,
  },
};
