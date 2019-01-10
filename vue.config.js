const path = require('path')

module.exports = {
  // webpack-dev-server 的配置项
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  outputDir: 'docs'
  // configureWebpack: {
  //   build: {
  //     // Template for index.html
  //     index: path.resolve(__dirname, '../docs/index.html'),

  //     // Paths
  //     assetsRoot: path.resolve(__dirname, '../docs'),
  //     assetsSubDirectory: 'static',
  //     assetsPublicPath: './'
  //   }
  // }
}
