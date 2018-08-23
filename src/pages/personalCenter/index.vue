<template>
  <div class="myContainer">
    <img src="/static/imgs/Wedges-3.7s-200px.svg" v-if="isLoading" class="svg-loading">
    <div v-if="!isLoading">
      <div class="loginBtn" v-if="!isLogin">
        <button
          open-type="getUserInfo"
          @getuserinfo="bindGetUserInfo"
        >授权登录</button>
      </div>
      <div class="myBlock" v-if="isLogin">
        <div class="myTop">
          <div class="myInfor">
            <div class="myPic">
              <!--<open-data type="userAvatarUrl"></open-data>-->
              <img :src="userInfors.avatarUrl">
            </div>
            <div class="myName">
              <!--<open-data type="userNickName"></open-data>-->
              <span>{{userInfors.nickName}}</span>
            </div>
          </div>
          <div class="topItems">
            <div class="collect it" @click="inCollect">
              <span class="num">{{collectBooks.length}}</span>
              <span>收藏</span>
            </div>
            <div class="follow it">
              <span class="num">0</span>
              <span>关注</span>
            </div>
            <div class="fans it">
              <span class="num">0</span>
              <span>粉丝</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { login } from '@/utils/fetch'
  import { mapState } from 'vuex'

  export default {
    computed: {
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState(['isLoading'])
    },
    data(){
      return{
        isLogin: false,
        collectBooks: [],
        userInfors: ''
      }
    },
    onShow() {
      // 查看是否授权
      let self = this;
      wx.getSetting({
        success: function(res){
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            self.isLogin = true;
            wx.getUserInfo({
              success: function(res) {
                self.isLogin = true;
                // console.log(res)
                self.userInfors = res.userInfo
                self.getcollectNum();
              }
            })
          }
        },
        fail(){
          self.isLogin = false;
        }
      })
    },
    methods: {
      getcollectNum(){
        let self = this;
        this.$fetch.get('/collection',{},function(res){
          // console.log(res);
          self.collectBooks = res.data
        })
      },
      bindGetUserInfo: function(e) {
        // console.log(e)
        if(e.mp.detail.errMsg === 'getUserInfo:ok'){
          this.userInfors = e.target.userInfo
          login().then(() => {
            this.getcollectNum();
            this.isLogin = true;
          })
        }else{
          wx.showToast({
            title: '授权失败'
          })
        }
      },
      inCollect(){
        wx.navigateTo({
          url: '/pages/collection/main'
        })
      },
      // getDatas(){
      //   this.$fetch.get('/readList', {}, function(res) {
      //     console.log(res);   //取得读过的数据    因为用的是cb 所以没有.then
      //   })
      //   // let token = wx.getStorageSync('token')
      //   // wx.request({  // 发起网络请求
      //   //   url: 'https://m.yaojunrong.com/readList',
      //   //   method: 'GET',
      //   //   header: {
      //   //     'content-type': 'application/json',
      //   //     token
      //   //   },
      //   //   success (data) {
      //   //     console.log(data);
      //   //   }
      //   // })
      // },
    },
    onShareAppMessage () {
      return {
        title: '我的个人中心页',
        path: '/pages/personalCenter/main'
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../css/personalCenter';
</style>
