
const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const paths = {
  build: path.join(__dirname, 'build'),
  src: path.join(__dirname, 'src')
}

module.exports = {
  entry: {
    background: path.join(paths.src, 'background.js'),
    options: path.join(paths.src, 'options.js')
  },
  output: {
    path: paths.build,
    filename: '[name].build.js',
    sourceMapFilename: '[file].map'
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [
          path.join(paths.src, 'js')
        ],
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.join(paths.src, 'js')
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: path.join(paths.src, 'manifest.json'),
          to: paths.build
        }
      ],
      {
        copyUnmodified: true
      }
    ),
    new CopyWebpackPlugin(
      [
        {
          from: path.join(paths.src, 'extensionIcon.png'),
          to: paths.build
        }
      ]
    )
  ]
}
