const chokidar = require('chokidar')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs-extra');
const Mock = require('mockjs')
const BASE_API = process.env.VUE_APP_BASE_API;

const mockDir = path.join(process.cwd(), 'mock')

function registerRoutes(app) {
  let mockLastIndex
  const { mocks } = require('./fake/index.js')
  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
  })
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocksForServer).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${BASE_API}${url}`),
    type: type || 'get',
    response(req, res) {
      console.log('request invoke:' + req.path)
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

module.exports = app => {
  const allUrl = new RegExp(/^BASE_API(\/.*)?(\?.*)?(#.*)?$/i.source.replace('BASE_API', BASE_API))
  // const allUrl = `${BASE_API}/*`
  app.all(allUrl, function (req, res, next) {
    // 默认从 mock/api 里面找文件，找不到就 fake 一个
    // 参数的处理待优化
    const mockPath = path.join(mockDir, req.path);
    if(fs.existsSync(mockPath)){
      const json  = fs.readFileSync(mockPath);
      res.status(200).json(JSON.parse(json));
    } else {
      next();
    }
  });

  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  // watch files, hot reload mock server
  chokidar.watch(mockDir, {
    ignored: [
      /mock-server/,
      '.DS_Store',
      '.gitignore',
    ],
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        // remove mock routes stack
        app._router.stack.splice(mockStartIndex, mockRoutesLength)

        // // clear routes cache
        unregisterRoutes()

        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}
