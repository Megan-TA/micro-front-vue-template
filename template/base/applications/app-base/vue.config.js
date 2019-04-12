const webpack = require('webpack')
const InsertScriptPlugin = require('./scripts/InsertScriptWebpackPlugin')
const APP_NAME = require('./package.json').name
const PORT = require('./package.json').devPort
const PROXY = require('./config/proxy')
const modules = require('./scripts/modules')

log('APP_NAME: ', APP_NAME)

module.exports = {
  publicPath: './',

  productionSourceMap: false,

  configureWebpack: {
    externals: {
      vue: 'Vue'
      // 'element-ui': 'ELEMENT',
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.VUE_APP_NAME': JSON.stringify(APP_NAME)
      }),
      new InsertScriptPlugin({ files: modules })
    ]
  },

  devServer: {
    port: PORT,
    disableHostCheck: true,
    proxy: PROXY
  }
}

function log (label, content, options) {
  console.log('\x1b[1m%s\x1b[31m%s\x1b[0m', label, content)
}
