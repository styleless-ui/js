const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * Webpack Configuration
 */
/** @type import('webpack').Configuration */
const config = {
  mode: "development",
  entry: path.join(__dirname, "examples/index.ts"),
  module: {
    rules: [
      {
        test: /\.(js|ts)?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              configFile: "tsconfig.dev.json",
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "examples/index.html"),
      filename: "./index.html",
    }),
  ],
};

module.exports = config;
