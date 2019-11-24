import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: !isProd ? 'development' : 'production',

  devtool: 'source-map',

  entry: path.resolve(__dirname, '#'),

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['node_modules', './'],
  },

  module: {
    rules: [
      { test: /\.(ts|js)x?$/, loader: 'ts-loader', exclude: /node_module/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },

  plugins: [new HtmlWebpackPlugin({ template: '#/index.html' })],

  devServer: {
    stats: 'minimal',
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8081,
  },
};
