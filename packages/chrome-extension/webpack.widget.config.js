const path = require('path')

module.exports = {
  mode: 'production',
  // devtool: "inline-source-map",
  entry: './main/src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules|server|dashboard|popup/,
      },
      {
        test: /.tsx?/,
        loader: 'ts-loader',
        exclude: /node_modules|server|dashboard|popup/,
        include: [
          path.resolve(__dirname, 'main/'),
          path.resolve(__dirname, 'common/'),
        ],
      },
    ],
  },
}
