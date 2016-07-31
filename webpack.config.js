import path from 'path';
import webpack from 'webpack';

const config = {
  devtool: 'source-map',
  entry: [
    './assets/src/js/index.js',
  ],
  output: {
    path: path.join(__dirname, 'assets/dist/js/'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015'],
      },
    },
  ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
};
export default config;
