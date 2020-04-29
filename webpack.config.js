module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: `${__dirname}/dist`,
    filename: "H2A_TawagotoParser.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
