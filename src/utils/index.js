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
const baseUrl = "https://m.yaojunrong.com";

export const axios = {
  get(url, data) {
    let token = wx.getStorageSync('token')
    let header = {
      'content-type': 'application/json'
    }
    if(token){
      header.token = token
    }
    return new Promise((resolve, reject) => {
      store.commit('setIsLoading', true);
      wx.request({
        url: baseUrl + url,
        method: "GET",
        data,
        header,
        success(res) {
          if(res.header.Token){
            wx.setStorageSync('token', res.header.Token)
          }
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
    let token = wx.getStorageSync('token')
    let header = {
      'content-type': 'application/json'
    }
    if(token){
      header.token = token
    }
    return new Promise((resolve, reject) => {
      store.commit('setIsLoading', true);
      wx.request({
        url: baseUrl + url,
        method: "POST",
        data,
        header,
        success(res) {
          if(res.header.Token){
            wx.setStorageSync('token', res.header.Token)
          }
          store.commit('setIsLoading', false);
          resolve(res.data);
        },
        error(err) {
          store.commit('setIsLoading', false);
          reject(err);
        }
      });
    });
  },
  // login () {
  //   const self = this
  //   return new Promise((resolve, reject) => {
  //     wx.login({
  //       success (data) {
  //         self.post('/login', {code: data.code}).then(res => {
  //           resolve(res)
  //         })
  //       },
  //       error (err) {
  //         reject(err)
  //       }
  //     })
  //   })
  //
  // }
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

