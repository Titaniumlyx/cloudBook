import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#D5FFB3',
    navigationBarTitleText: 'test页面',
    navigationBarTextStyle: 'black'
  }
}
