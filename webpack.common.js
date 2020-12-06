const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // installed via npm
const HtmlWebpackPlugin = require("html-webpack-plugin"); // installed via npm
const webpack = require("webpack"); // to access built-in plugins
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin({}),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: "./src/robots.txt", to: "." }],
    }),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new webpack.DefinePlugin({
      GRAPHQL_URI: JSON.stringify(
        process.env.GRAPHQL_URI || "https://api.spaceapi.dev/api/graphql"
      ),
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      // Must be below test-utils
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(process.cwd(), "public"),
  },
};
