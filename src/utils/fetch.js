// 另一个ajax的封装，两者有所同有所异
const baseUrl = "https://m.yaojunrong.com"

export const fetch = {
  get(url, data, cb){   // cb: callback,回调函数，可代替写promise
    let token = wx.getStorageSync('token')
    let header = {
      'content-type': 'application/json'
    }
    if(token){
      header.token = token
    }
    wx.request({
      url: baseUrl + url,
      method: 'GET',
      data,
      header,
      success(res){
        if(res.header.Token){
          wx.setStorageSync('token', res.header.Token)
        }
        cb(res.data);
      }
    })
  },
  post(url, data, cb){   // cb: callback,回调函数，可代替写promise
    let token = wx.getStorageSync('token')
    let header = {
      'content-type': 'application/json'
    }
    if(token){
      header.token = token
    }
    wx.request({
      url: baseUrl + url,
      method: 'POST',
      data,
      header,
      success(res){
        // console.log(res);
        if(res.header.Token){
          wx.setStorageSync('token', res.header.Token)
        }
        cb(res.data);
      }
    })
    // wx.request({
    //   url: baseUrl + url,
    //   header,
    //   method: 'POST',
    //   data,
    //   success (res) {
    //     cb(res.data)
    //   }
    // })
  }
}

export const login = () => {
  return new Promise(resolve => {
    wx.login({
      success(res){
        fetch.post('/login', {
          code: res.code,
          appid: 'wxd465ed91406e43c8',
          secret: 'ed9775efe18f6028d53b835d3ebb53b5'
        }, function(data) {
          console.log(data);
          resolve(data)
        })
      }
    })
  })
}
