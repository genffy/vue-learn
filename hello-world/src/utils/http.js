import axios from 'axios';

const jssdkSendLog = (code, message, level = 'error') => {
    if (!code || !message) {
        return false;
    }
    console.log({
        code,
        message,
        level,
    });
}

// 全局配置
axios.defaults.retry = 1; //重试次数
axios.defaults.retryDelay = 1000; //重试延时
axios.defaults.shouldRetry = () => true; //重试条件，默认只要是错误都需要重试
// 如果 window 上有 SALE_BASE_URL  的设定，则读取该设置。
// eslint-disable-next-line no-extra-boolean-cast
if (!!window.SALE_BASE_URL) {
    axios.defaults.baseURL = window.SALE_BASE_URL;
}
// create an axios instance
const service = axios.create({
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 30000, // request timeout
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    },
});

// 响应拦截器
service.interceptors.response.use(undefined, (err) => {
    var config = err.config;

    // 打印错误 方便调试
    console.error(err);

    // 错误处理函数 不提示给用户 注释掉
    // handl_request_error(err);

    // 请求错误埋点
    let errRes = err.response ? {
        status: err.response.status,
        statusText: err.response.statusText
    } : ((err.message && err.message.includes('timeout')) ? {
        status: 20000,
        statusText: 'Timeout Error'
    } : {
        status: 10000,
        statusText: 'Network Error'
    });

    let errResData = (err.response && err.response.data) || {};

    const logMessage = Object.assign({}, errRes, errResData, {
        name: '请求接口错误',
        method: config.method,
        url: config.url,
        param: config.data || null
    });

    console.log('logMessage', logMessage, 'error config', config);

    jssdkSendLog('request_api_failed', logMessage);

    // 判断是否配置了重试
    if (!config || !config.retry) return Promise.reject(err);

    if (!config.shouldRetry || typeof config.shouldRetry != "function") {
        return Promise.reject(err);
    }

    //判断是否满足重试条件
    if (!config.shouldRetry(err)) {
        return Promise.reject(err);
    }

    // 设置尝试次数，默认为0
    config.__retryCount = config.__retryCount || 0;

    // 判断是否超过了重试次数
    if (config.__retryCount >= config.retry) {
        return Promise.reject(err);
    }

    //重试次数自增
    config.__retryCount += 1;

    //延时处理
    var backoff = new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, config.retryDelay || 1);
    });

    //重新发起axios请求
    return backoff.then(function () {
        return service(config);
    });
});

// 请求错误处理函数
// function handl_request_error(err) {
//   if(!err.response){
//     let {url} = err.config;
//     console.error(`${url}请求超时`);
//     reject({code:'SALE1001',message:`${url}请求超时`})
//     return;
//   }

//   if(err.response.status==401){
//     Message({
//       message: '权限不足',
//       type: 'err',
//       duration: 5 * 1000
//     });
//   } else{
//     console.error('sale-webapp数据请求失败,请刷新页面重试');
//   }
// }
export default service;
export const axiosInst = axios;