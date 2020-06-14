const webpack = require('webpack');
const modoDev = process.env.TS_NODE_PROJECT !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path');
const babel-polyfill = require('babel-polyfill');
const babel-loader = require ('babel-loader');
const sass-loader = require ('sass-loader');
const ts-loader = require ('ts-loader');
 

module.exports= {
  mode: modoDev ? "development" : "production",


  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: __dirname,
    filename: './dist/index.js',
  },
  devServer: {
    contentBase: "./dist",
    inline: false,
    port: 9090,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new optimizeCssAssetsWebpackPlugin({}),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  module: {
     
    
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [MiniCssExtractPlugin.loader,  "sass-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      }, {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babelloader'
      },{
        test: /\.ts$/, loaders: ['babelloader', 'ts'], exclude: /node_modules/
      }

    ],
  },
  resolve: {
    extensions: [' ','*', '.js', '.jsx', '.tsx', '.ts'],
  }
};


 