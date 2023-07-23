const path = require('path')

module.exports = {
  mode: 'production',
  // devtool: "inline-source-map",
  entry: './widget/src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'widget.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules|server|popup/,
      },
      {
        test: /.tsx?/,
        loader: 'ts-loader',
        exclude: /node_modules|server|popup/,
        include: [
          path.resolve(__dirname, 'widget/'),
          path.resolve(__dirname, 'common/'),
        ],
      },
    ],
  },
}
