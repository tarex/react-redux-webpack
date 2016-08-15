import path from 'path';
import express from 'express';
import webpack from 'webpack';
import config from '../webpack.dev.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import Dashboard from 'webpack-dashboard';
const DashboardPlugin = require('webpack-dashboard/plugin');
const DEV_PORT = 3000;
const app = express();
const compiler = webpack(config);
const dashboard = new Dashboard();

compiler.apply(new DashboardPlugin(dashboard.setData));

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});
app.listen(DEV_PORT, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`==> 🌎  Listening at http://localhost:${DEV_PORT}`);
});
