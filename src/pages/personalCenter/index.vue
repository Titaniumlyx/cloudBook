<template>
  <div>
    <button @click="login">LOGIN</button>
    <button @click="getDatas">GETDATA</button>
  </div>
</template>

<script>
  import { login } from '@/utils/fetch'

  export default {
    name: "index",
    methods: {
      login(){
        login()
        // wx.login({
        //   success: function(res) {
        //     // console.log(res);
        //       wx.request({  // 发起网络请求
        //         url: 'https://m.yaojunrong.com/login',
        //         method: 'POST',
        //         header: {
        //           'content-type': 'application/json'
        //         },
        //         success (data) {
        //           console.log(data);
        //           wx.setStorageSync('token', data.header.Token)
        //         }
        //       })
        //   }
        // });
      },
      getDatas(){
        this.$fetch.get('/readList', {}, function(res) {
          console.log(res);   //取得读过的数据    因为用的是cb 所以没有.then
        })
        // let token = wx.getStorageSync('token')
        // wx.request({  // 发起网络请求
        //   url: 'https://m.yaojunrong.com/readList',
        //   method: 'GET',
        //   header: {
        //     'content-type': 'application/json',
        //     token
        //   },
        //   success (data) {
        //     console.log(data);
        //   }
        // })
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
