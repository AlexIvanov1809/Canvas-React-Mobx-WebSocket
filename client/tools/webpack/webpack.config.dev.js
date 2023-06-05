module.exports = {
  mode: "development",
  entry: ["./src/main.jsx"],
  module: {
    rules: require("./webpack.rules")
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },
  plugins: require("./webpack.plugins"),
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    alias: require("./webpack.aliases")
  },
  stats: "errors-warnings",
  devtool: "cheap-module-source-map",
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        // pathRewrite: { "^/api": "" },
        secure: false
      }
    },
    historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  performance: {
    hints: false
  }
};
