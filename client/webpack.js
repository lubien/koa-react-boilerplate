const webpack = require('webpack');
const path = require('path');
const config = require('../server/config');

let devtool = 'eval';

const entry = [
  path.join(__dirname, './entry.js'),
];

const output = {
  path: path.join(__dirname, '../public/scripts/'),
  filename: 'bundle.js',
};

const plugins = [];

if (config.is.dev) {
  devtool = 'source-map';

  entry.unshift('webpack/hot/only-dev-server');
  entry.unshift(`webpack-dev-server/client?${config.WEBPACK_BASE_URL}/`);

  output.publicPath = `${config.WEBPACK_BASE_URL}/`;

  plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (config.is.prod) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }));
  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }));
}

module.exports = {
  devtool, entry, plugins, output,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
          compact: false,
        },
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
