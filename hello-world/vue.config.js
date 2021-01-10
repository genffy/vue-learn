'use strict'
const path = require('path')
const glob = require('glob')

function resolve(dir) {
  return path.join(__dirname, dir)
}
// support multi page
const pages = {}
try {
  glob.sync('./src/pages/*/*.js').forEach(filepath => {
    const fileList = filepath.split('/')
    const fileName = fileList[fileList.length - 2]
    pages[fileName] = {
      entry: `src/pages/${fileName}/index.js`,
      template: `src/pages/${fileName}/index.html`,
      filename: process.env.NODE_ENV === 'development' ? `${fileName}.html` : `${fileName}/${fileName}.html`
    }
  })
  // 需要添加下默认的页面，不然会报错
  // URIError: Failed to decode param '/%3C%=%20BASE_URL%20%%3Efavicon.ico'
  // pages['index'] = {
  //   entry: `src/main.js`
  // }
} catch (e) {
  console.error('Get pages error')
}
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  pages,
  lintOnSave: process.env.NODE_ENV === 'development',
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'HelloVue',
    resolve: {
      alias: {
        '@src': resolve('src'),
        '@util': resolve('src/utils'),
        '@module': resolve('src/modules'),
        '@page': resolve('src/pages'),
        '@component': resolve('src/components'),
        '@mock': resolve('src/mock'),
        '@assets': resolve('src/assets'),
      }
    },
    externals: {
      'vue': 'Vue',
      'element-ui' : 'ELEMENT',
    }
  },
}
