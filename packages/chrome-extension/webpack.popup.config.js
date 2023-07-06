const path = require('path')

module.exports = {
  mode: 'production',
  // devtool: "inline-source-map",
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
        exclude: /node_modules|server|dashboard|widget/,
      },
      {
        test: /.tsx?/,
        loader: 'ts-loader',
        exclude: /node_modules|server|dashboard|widget/,
        include: [
          path.resolve(__dirname, 'popup/'),
          path.resolve(__dirname, 'common/'),
        ],
      },
    ],
  },
}
