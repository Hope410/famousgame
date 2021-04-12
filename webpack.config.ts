import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

import 'webpack-dev-server';

const config: webpack.Configuration = {
  mode: "development",
  devServer: {
    compress: true,
    port: 8080,
    host: '0.0.0.0',
  },
  resolveLoader: {
    alias: {
      '@': './src'
    }
  },
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },
  optimization: {
    runtimeChunk: "single",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Famous Game",
      template: './public/index.html'
    }),
  ],
};

export default config;
