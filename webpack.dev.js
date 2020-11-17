const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    https: true,
    port: 3000,
    open: true,
    compress: true,
    writeToDisk: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, "build"),
  },
});
