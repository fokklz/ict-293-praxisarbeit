const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/main.js',
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
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          'css-loader', // Translates CSS into CommonJS
          'sass-loader', // Compiles Sass to CSS
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/style.css', // Output CSS file name
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
};
