const { merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin")
  .default;
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new HTMLInlineCSSWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: "./src/robots.txt", to: "." }],
    }),
  ],
});
