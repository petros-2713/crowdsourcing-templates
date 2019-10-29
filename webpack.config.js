// webpack v4
// Webpack uses this to work with directories
const path = require('path'); // update 23.12.2018
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
  // Path to your entry point. From this file Webpack will begin his work
  entry: {
    main: './src/index.js'
  },
  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [{
        test: [/.js$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.scss$/,
        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          // This loader resolves url() and @imports inside CSS
          "css-loader",
          // First we transform SASS to standard CSS
          "sass-loader"
        ]
      },
      {
        // Now we apply rule for images
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          // Using file-loader for these files
          loader: "file-loader",

          // In options we can set different things like format
          // and directory to save
          options: {
            name: '[name].[ext]',
            outputPath: 'dist/img'
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: require.resolve('jquery'),
      jQuery: require.resolve('jquery')
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    }), new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([{
      from: './src/images',
      to: 'img'
    }])
  ]
};