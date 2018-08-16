import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '云书',
    tabBar: {
      color: '#515151',
      selectedColor: '#1296db',
      borderStyle: '#686969',
      list: [{
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: '/static/imgs/index',
        selectedIconPath: '/static/imgs/index-active'
      }, {
        pagePath: "pages/myBook/index",
        text: "我的阅读",
        iconPath: '/static/imgs/myRead',
        selectedIconPath: '/static/imgs/myRead-active'
      },{
        pagePath: "pages/personalCenter/index",
        text: "个人中心",
        iconPath: '/static/imgs/my',
        selectedIconPath: '/static/imgs/my-active'
      }]
    },
  }
}
