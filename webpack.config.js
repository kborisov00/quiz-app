// dependencies
const path = require('path');
const webpack = require('webpack');

// plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// constants
const SOURCE_DIRECTORY = path.join(__dirname, 'src');
const ENTRY_JS_FILE = 'index.js';
const ENTRY_HTML_FILE = 'index.html';

// html plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

let htmlPageNames = ['screens/game']; // every html page path in my project
let multipleHtmlPluginInstances = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: ['index'] // respective JS files
  })
});

module.exports = {
  // chosen mode tells webpack to use its built-in optimizations accordingly.
  mode: 'development',

  // here the application starts executing
  // and webpack starts bundling
  entry: {
    index: path.join(SOURCE_DIRECTORY, ENTRY_JS_FILE),
  },

  // list of additional plugins
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename:'style.[chunkhash].css' }),
    new HtmlWebpackPlugin({
      template: path.join(SOURCE_DIRECTORY, ENTRY_HTML_FILE),
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ].concat(multipleHtmlPluginInstances),

  // modules configuration
  module: {
    rules: [
      // html rules
      {
        test: /\.html%/,
        use: [
          {
            loader: 'html-loader',
            options: {minimize: true}
          }
        ]
      },

      // javascript rules
      {
        test: /\.(js)$/,
        include: [SOURCE_DIRECTORY],
        use: ['babel-loader', 'eslint-loader']
      },

      // scss/css rules
      {
        test: /.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,

          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },

          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  // optimization configuration
  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: false
    }
  }
}