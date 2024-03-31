const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');

const jsEntries = glob.sync('./src/js/!(_)*.js').reduce((acc, filePath) => {
  const entryName = path.basename(filePath, '.js');
  acc[entryName] = filePath;
  return acc;
}, {});

module.exports = {
  entry: jsEntries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /^(?!.*\/_).*\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './assets/css/style.css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src',
          to: '.',
          globOptions: {
            ignore: ['**/*.js', '**/*.scss', '**/templates/**'],
          },
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [new TerserPlugin(), new CSSMinimizerPlugin()],
  },
  performance: {
    assetFilter: function (assetFilename) {
      // Ignore asset size warnings for files in assets/img
      return !assetFilename.startsWith('assets/img/');
    },
  },
};
