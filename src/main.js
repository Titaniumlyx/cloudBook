import Vue from 'vue'
import App from './App'
import './main.css'
import { axios } from '@/utils/index'
import store from './store'
import { fetch } from '@/utils/fetch'

Vue.prototype.$axios = axios
Vue.prototype.$store = store
Vue.prototype.$fetch = fetch

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#515151',
      selectedColor: '#1296db',
      borderStyle: '#686969',
      list: [{
        pagePath: "pages/index/main",
        text: "首页",
        iconPath: '/static/imgs/index.png',
        selectedIconPath: '/static/imgs/index-active.png'
      },{
        pagePath: "pages/myBook/main",
        text: "我的阅读",
        iconPath: '/static/imgs/myRead.png',
        selectedIconPath: '/static/imgs/myRead-active.png'
      },{
        pagePath: "pages/category/main",
        text: "书城",
        iconPath: '/static/imgs/allBooks.png',
        selectedIconPath: '/static/imgs/allBooks-active.png'
      },{
        pagePath: "pages/personalCenter/main",
        text: "个人中心",
        iconPath: '/static/imgs/my.png',
        selectedIconPath: '/static/imgs/my-active.png'
      }]
    },
  }
}
