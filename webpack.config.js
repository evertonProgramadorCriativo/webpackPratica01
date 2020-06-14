const webpack = require("webpack");
const modoDev = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: modoDev ? "development" : "production",
  mode: "development",
  entry: "./src/index.js",
  entry: "./src/ts/index.ts",
  output: {
    filename: "indexBuild.js",
    path: __dirname + "/public",
  },
  output: {
    filename: "indexBuildTs.js",
    path: __dirname + "/public",
  },
  devServer: {
    contentBase: "./public",
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: "./src/ts/index.ts",
      },
    ],
  },
};
