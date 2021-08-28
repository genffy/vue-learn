import service, { axiosInst as axiosOrigin } from './http';

export function login() {
  
}

export function logout() {
  fetch({
    url: `/uc/bLogout`,
    baseURL: '',
  }).then((res) => {
    if (res.code != 200) {
      throw res.data || '退出异常';
    }
    login()
  })
}

export default function fetch(options, isReject = false) {
  return new Promise((resolve, reject) => {
    service(options)
      .then(response => {
        const res = response.data;
        // 未登陆
        if (res.code == 11) {
          login();
          return;
        }
        if (res.code == -1) {
          throw new Error('服务有点忙，请耐心等待');
        }
        resolve(res);
      })
      // 注释错误透传
      .catch((error) => {
        if (isReject) {
          reject(error);
        } else {
          console.log(error)
        }
      });
  });
}

export function post(url, data) {
  return new Promise((resolve, reject) => {
    fetch({
      url,
      method: 'POST',
      data,
    }).then(res => {
      if (!res) {
        throw new Error('后端返回数据为空，请联系相关后端人员');
      }
      const { code, data, message } = res;
      if (code != 0) {
        throw new Error(message);
      }
      resolve(data);
    })
      .catch(err => {
        reject(err);
      });
  });
}

export function get(url, params, hasBackupUrl) {
  return new Promise((resolve, reject) => {
    fetch({
      url,
      method: 'GET',
      params,
    }, hasBackupUrl).then(res => {
      if (!res) {
        throw new Error('后端返回数据为空，请联系相关后端人员');
      }
      const { code, data, message } = res;
      if (code != 0) {
        throw new Error(message);
      }
      resolve(data);
    }).catch(err => {
      reject(err);
    });
  })
}

export const axiosInst = axiosOrigin;