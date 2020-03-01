if ('serviceWorker' in window.navigator) {
    navigator.serviceWorker.register('./sw.js', { scope: './' })
        .then(function (reg) {
            navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage({
                type: 'init',
                data: 'this message is from page',
            });
            pageHeartBeat();
        })
        .catch(function (err) {
            console.log('fail', err);
        });
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function pageHeartBeat() {
    let HEARTBEAT_INTERVAL = 5 * 1000;
    let sessionId = uuidv4();
    let heartbeat = function () {
        navigator.serviceWorker.controller.postMessage({
            type: 'heartbeat',
            id: sessionId,
            data: {} // 通过公司的埋点工具获取页面信息
        });
    }
    // https://developer.mozilla.org/zh-CN/docs/Web/Events/beforeunload
    window.addEventListener("beforeunload", function () {
        navigator.serviceWorker.controller.postMessage({
            type: 'unload',
            id: sessionId
        });
    });
    setInterval(heartbeat, HEARTBEAT_INTERVAL);
    heartbeat();
}