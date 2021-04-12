import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

import 'webpack-dev-server';

const config: webpack.Configuration = {
  mode: 'development',
  devServer: {
    compress: true,
    port: 3000,
    hot: true,
    allowedHosts: ['.repl.it', '.repl.co', '.repl.run'],
  },
  entry: './src/main.ts',
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
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  optimization: {
    runtimeChunk: 'single',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Famous Game',
      template: './public/index.html',
    }),
  ],
};

export default config;
