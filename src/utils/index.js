function formatNumber(n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

export function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join("/");
  const t2 = [hour, minute, second].map(formatNumber).join(":");

  return `${t1} ${t2}`;
}

const baseUrl = "http://m.yaojunrong.com";

export const axios = {
  get(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        method: "GET",
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data);
        },
        error(err) {
          reject(err);
        }
      });
    });
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data);
        },
        error(err) {
          reject(err);
        }
      });
    });
  }
};

export default {
  formatNumber,
  formatTime,
  axios
};
