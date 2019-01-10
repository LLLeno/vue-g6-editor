const path = require('path')

module.exports = {
  // webpack-dev-server 的配置项
  baseUrl: './', // 配合Github Pages 使用
  outputDir: 'docs', // 配合Github Pages 使用
  assetsDir: './', // 配合Github Pages 使用
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
  }
}
