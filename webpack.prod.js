/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin")
  .default;
const common = require("./webpack.common.js");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
  },
  plugins: [
    new HTMLInlineCSSWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: "./src/robots.txt", to: "." }],
    }),
    // Modules should get deterministic ids so that they don't change between builds
    new webpack.ids.HashedModuleIdsPlugin(),

    // Merge bundles that would otherwise be negligibly small
    new webpack.optimize.AggressiveMergingPlugin(),

    // Scope Hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
});
