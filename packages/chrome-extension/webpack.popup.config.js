const path = require('path')

module.exports = {
  mode: 'production',
  entry: './popup/src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'popup.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules|server|widget/,
      },
      {
        test: /.tsx?/,
        loader: 'ts-loader',
        exclude: /node_modules|server|widget/,
        include: [
          path.resolve(__dirname, 'popup/'),
          path.resolve(__dirname, 'common/'),
        ],
      },
    ],
  },
}
