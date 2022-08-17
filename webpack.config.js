const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    hot: true,
    port: 8080,
    contentBase: path.join(__dirname, 'assets'),
  },
}

const eslintPlugin = (isDev) => isDev ? [] : [new ESLintPlugin({ extensions: ["ts", "js"] })];

module.exports = ({develop}) => ({
  mode: develop ? "development" : "production",
  devtool: develop ? "inline-source-map" : false,
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext]',
  },
  module:{
    rules: [
      {
      test: /\.[tj]s$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
      type: 'asset/resource',
    },
    {
      test: /\.(woff(2)?|eot|ttf|otf)$/i,
      type: 'asset/resource',
    },
    {
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    },
    {
      test: /\.s[ac]ss$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    }
  ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/assets/image/rs-lang.png",
    }),
    new MiniCssExtractPlugin({
      filename: "[name][contenthash].css"
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: './src/assets', to: './assets',
          noErrorOnMissing: true
        },
      ]
    }),
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    ...eslintPlugin(develop),
  ],
  ...devServer(develop),
});