let crashDb = null;
if (window.IndexedDBStore) {
    crashDb = window.IndexedDBStore.create('zm_crash_db_v2');
    // 清除之前的数据
    try {
        const crashDbV1 = window.IndexedDBStore.create('zm_crash_db');
        crashDbV1.clear(function () {
            crashDbV1.close();
        });
    } catch (e) {
        console.error('清除zm_crash_db数据失败')
    }
}

if ('serviceWorker' in window.navigator) {
    const pathArr = location.pathname.split('/');
    pathArr.splice(-1);
    const scopeStr = `./`;
    navigator.serviceWorker.register(`${scopeStr}sw.js`, { scope: scopeStr })
        .then(function (reg) {
            console.log('register sw', reg);
            navigator.serviceWorker.ready.then(function (registration) {
                console.log('A service worker is active:', registration.active);
                // At this point, you can call methods that require an active
                // service worker, like registration.pushManager.subscribe()
                navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage({
                    type: 'init',
                    data: 'this message is from page',
                });
                pageHeartBeat();
            });
        })
        .catch(function (err) {
            console.error('fail', err);
        });
    // 默认上报
    reportData();
}

function uuidv4 () {
    return 'zm-sale-yxxx-xxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function pageHeartBeat () {
    let HEARTBEAT_INTERVAL = 5 * 1000;
    let sessionId = uuidv4();
    let heartbeat = function () {
        navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage({
            type: 'heartbeat',
            id: sessionId,
            data: {
                href: location.href,
            } // TODO 通过公司的埋点工具获取页面信息
        });
    }
    // https://developer.mozilla.org/zh-CN/docs/Web/Events/beforeunload
    window.addEventListener("beforeunload", function () {
        navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage({
            type: 'unload',
            id: sessionId
        });
        // 清除掉db里面的数据
        clearDb()
    });
    setInterval(heartbeat, HEARTBEAT_INTERVAL);
    heartbeat();
}

function clearDb () {
    if (crashDb) {
        crashDb.clear(function () {
            crashDb.close();
        });
    }
}

function reportData () {
    try {
        if (!crashDb) {
            return
        }
        const nowDate = new Date();
        const nhour = nowDate.getHours();
        // Adding judgment that 0-8 hours does not sendLog.
        if (nhour > 7) {
            crashDb.getAllKeys(function (keys) {
                if (!keys.length) {
                    return
                }
                keys.forEach(function (key) {
                    crashDb.read(key, function (_key, value) {
                        // 开始上报数据
                        let arr = key.split('_');
                        arr.pop();
                        // TODO 上报 SDK
                        const log = {
                            code: arr.join('_'),
                            level: 'error',
                            message: value,
                        };
                        console.log('jssdk', log);
                        console.log('上报打点数据', value);
                        crashDb.remove(_key, function () {
                            console.log('删除db的数据', value);
                        }, function () {
                            console.log('删除db的数据失败', value);
                        });
                    }, function (err) {
                        console.log('读取key：', key, '失败：', err);
                    });
                });
                clearDb();
            }, function (err) {
                console.log('获取db all keys 失败', err);
            });
        } else {
            clearDb();
        }
    } catch (e) {
        console.log('上报db数据出错');
    }
}
