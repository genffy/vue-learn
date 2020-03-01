// sw.js
const CHECK_CRASH_INTERVAL = 10 * 1000; // 每 10s 检查一次
const CRASH_THRESHOLD = 15 * 1000; // 超时时间，默认 15s，还有一种可能是页面js执行时间过长
const pages = {}
let timer

// 判断是否crash了
function checkCrash() {
  const now = Date.now()
  for (var id in pages) {
    let page = pages[id]
    if ((now - page.t) > CRASH_THRESHOLD) {
      // 上报 crash
      console.error('crash');
      // 发送事件给页面，进行数据上报
      // @TODO when how
      delete pages[id]
    }
  }
  if (Object.keys(pages).length == 0) {
    clearInterval(timer)
    timer = null
  }
}

// 监听消息
this.addEventListener('message', (e) => {
  const data = e.data;
  if (data.type === 'heartbeat') {
    pages[data.id] = {
      t: Date.now()
    }
    if (!timer) {
      timer = setInterval(function () {
        checkCrash()
      }, CHECK_CRASH_INTERVAL)
    }
  } else if (data.type === 'unload') {
    delete pages[data.id]
  } else if (data.type === 'info') {
    infoMatch(data);
  }
});

// 初始化
this.addEventListener('install', function (event) {
    console.log('install', pages, event); // this message is from page, to sw
});

// 激活
this.addEventListener('activate', function (event) {
    console.log('activate', event); // this message is from page, to sw
});

// 通知这个sw所控制的所有页面
function infoMatch(data) {
  this.clients.matchAll().then(function(clients) {
    clients.forEach(function(client) {
        client.postMessage(data);
    });
  });
}