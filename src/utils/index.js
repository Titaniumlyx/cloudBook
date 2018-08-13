// function formatNumber(n) {
//   const str = n.toString();
//   return str[1] ? str : `0${str}`;
// }
//
// export function formatTime(date) {
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;
//   const day = date.getDate();
//
//   const hour = date.getHours();
//   const minute = date.getMinutes();
//   const second = date.getSeconds();
//
//   const t1 = [year, month, day].map(formatNumber).join("/");
//   const t2 = [hour, minute, second].map(formatNumber).join(":");
//
//   return `${t1} ${t2}`;
// }
import store from '@/store';
const baseUrl = "http://m.yaojunrong.com";

export const axios = {
  get(url, data) {
    return new Promise((resolve, reject) => {
      store.commit('setIsLoading', true);
      wx.request({
        url: baseUrl + url,
        method: "GET",
        data,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          store.commit('setIsLoading', false);
          wx.hideLoading();
          resolve(res.data);
        },
        error(err) {
          store.commit('setIsLoading', false);
          wx.hideLoading();
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

export const loading = {
  show(title = 'loading...'){
    wx.showLoading({
      title
    })
  },
  hide(){
    wx.hideLoading()
  }
}

export default {
  axios,
  loading
};
