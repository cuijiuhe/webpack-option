const path = require('path')
const name = 'Web平台UI组件库' // 项目名称

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/webUI/' : '/', // TODO: Remember to change this to fit your need
  // lintOnSave: process.env.NODE_ENV === 'development',
  lintOnSave: false,
  pwa: {
    name: name
  },
  devServer: {
    proxy: {
      // projectApi 为项目接口代理路径，用于本地开发，开发时改为相应项目对应的名称，比如：shareApi
      '^/shareApi': {
        target: 'http://10.100.2.159:8188',
        pathRewrite: { '^/shareApi': '' },
        ws: true,
        changeOrigin: true
      }
    },
    // sockHost: 'http://localhost:8080',
    // disableHostCheck: true,
    // proxy: 'http://localhost:8080',
    // public: '192.168.1.16:8080'
    // host: 'localhost',
    port: 8080,
    // - 启用 gzip 压缩
    compress: true
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  chainWebpack(config) {
    // Provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)
  }
}
