const webpack = require('webpack')

module.exports = {
  entry: './src/slider.js',
  output: {
    path: './dist',
    filename: 'slider.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]
}
