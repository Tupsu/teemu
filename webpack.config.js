const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

let htmlMinifyOpts = {
  removeAttributeQuotes: true,
  collapseWhitespace: true,
  removeComments: true
}
module.exports = {
  mode: 'production',
  entry: {
    app: './src/js/index.js',
    resume: './src/js/resume.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs')
  },
  devServer: {
    contentBase: path.join(__dirname, 'docs')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['app'],
      minify: htmlMinifyOpts
    }),
    new HtmlWebpackPlugin({
      template: './src/resume.html',
      filename: 'resume.html',
      chunks: ['resume'],
      minify: htmlMinifyOpts
    }),
    new HtmlWebpackPlugin({
      template: './src/resumeEng.html',
      filename: 'resumeEng.html',
      chunks: ['resume'],
      minify: htmlMinifyOpts
    })
  ],
  module: {
    rules: [{
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }]
  }
};
