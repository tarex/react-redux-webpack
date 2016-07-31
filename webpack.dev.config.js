import path from 'path';
import webpack from 'webpack';

const webpackDevConfig = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'assets/src/js/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'assets/dist/js/'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    root: [path.resolve(__dirname, './assets/src/js'), path.resolve(__dirname, 'node_modules')],
    extensions: ['', '.js'],
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'assets/src/'),
    }],
  },
};

export default webpackDevConfig;
