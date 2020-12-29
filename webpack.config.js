// dependencies
const path = require('path');
const webpack = require('webpack');

// plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// html plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
let htmlPageNames = ['game']; // every html page path in my project
let multipleHtmlPluginInstances = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/screens/${name}.html`, // relative path to the HTML files
    filename: `./screens/${name}.html`, // output HTML files
    layout: './src/index.html', // html layout file
    chunks: ['index'] // respective JS files
  });
});

// constants
const SOURCE_DIRECTORY = path.join(__dirname, 'src');
const ENTRY_JS_FILE_PATH = 'index.js';
const ENTRY_HTML_FILE_PATH = 'screens/index.html';

module.exports = {
  // chosen mode tells webpack to use its built-in optimizations accordingly.
  mode: 'development',

  // here the application starts executing
  // and webpack starts bundling
  entry: {
    index: path.join(SOURCE_DIRECTORY, ENTRY_JS_FILE_PATH),
  },

  // list of additional plugins
  plugins: [
    new webpack.ProgressPlugin(),

    new MiniCssExtractPlugin({ filename:'style.css' }),

    new HtmlWebpackPlugin({
      template: path.join(SOURCE_DIRECTORY, ENTRY_HTML_FILE_PATH),
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),

    ...multipleHtmlPluginInstances, // every html file instance
  ],

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

      // ejs rules
      {
        test: /\.ejs$/,
        loader: 'ejs-loader'
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