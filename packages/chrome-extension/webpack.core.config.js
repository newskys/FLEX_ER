const path = require('path')

module.exports = {
  mode: 'production',
  entry: './core/src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'core.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules|server|dashboard|widget|popup/,
      },
      {
        test: /.tsx?/,
        loader: 'ts-loader',
        exclude: /node_modules|server|dashboard|widget|popup/,
        include: [
          path.resolve(__dirname, 'core/'),
          path.resolve(__dirname, 'common/'),
        ],
      },
    ],
  },
}
