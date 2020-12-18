/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: {
      index: "index.html",
    },
  },
});
