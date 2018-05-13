require('./setEnvironment')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    'contentScript': path.resolve(__dirname, 'contentScript.js'),
    'popup': path.resolve(__dirname, 'popup.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      '@data': path.resolve(__dirname,'data')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        mangle: true,
  	    compress: {
  		    sequences: true,
  		    dead_code: true,
  		    conditionals: true,
  		    booleans: true,
  		    unused: true,
  		    if_return: true,
  		    join_vars: true,
  		    //drop_console: true
        }
      }
    }),
    new CopyWebpackPlugin([{ from: 'resources' }])
  ]
}
