/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // installed via npm
const HtmlWebpackPlugin = require("html-webpack-plugin"); // installed via npm
const webpack = require("webpack"); // to access built-in plugins
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const WorkboxPlugin = require("workbox-webpack-plugin");

const webpackConfig = {
  mode: "production",
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(md)$/,
        use: {
          loader: "raw-loader",
        },
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    new CleanWebpackPlugin({ verbose: true, cleanStaleWebpackAssets: true }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),

    new HtmlWebpackPlugin({
      template: "./src/index.html",
      scriptLoading: "defer",
      publicPath: "/",
    }),
    new webpack.DefinePlugin({
      GRAPHQL_URI: JSON.stringify(
        process.env.GRAPHQL_URI || "https://graph.spaceapi.dev/"
      ),
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          // Match any request that ends with .png, .jpg, .jpeg or .svg.
          urlPattern: /https?:\/\/res\.cloudinary\.com\/(.*)/,

          // Apply a cache-first strategy.
          handler: "CacheFirst",

          options: {
            // Use a custom cache name.
            cacheName: "cloudinary-images",

            // Only cache 256 images.
            expiration: {
              maxEntries: 256,
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          // Match any request that ends with .png, .jpg, .jpeg or .svg.
          urlPattern: /https?:\/\/(graph\.spaceapi\.dev|.*herokuapp\.com)\/?*/,

          // Apply a cache-first strategy.
          handler: "StaleWhileRevalidate",

          options: {
            // Use a custom cache name.
            cacheName: "graphql-queries",

            // Only cache 32 queries for one day.
            expiration: {
              maxAgeSeconds: 60 * 60 * 24,
              maxEntries: 32,
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
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
      assert: "assert",
      // Must be below test-utils
    },
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: "single",
    moduleIds: "deterministic",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "initial",
        },
      },
    },
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(process.cwd(), "public"),
  },
};
module.exports = webpackConfig;
