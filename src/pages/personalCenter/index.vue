<template>
  <div>
    <button @click="login">LOGIN</button>
    <button @click="getDatas">GETDATA</button>
    <div class="container">
      <div>
        <div class="title">
          <span class="fll">我的收藏</span>
        </div>
        <a :href="'/pages/bookDesc/main?id='+item.book._id" class="bookList" v-for="(item,index) in collectBooks" :key="index">
          <div class="bookItem">
            <div class="bookPic">
              <img :src="item.book.img">
            </div>
            <div class="shuInfor">
              <div>
                <div class="bookTitle">
                  {{item.book.title}}
                </div>
                <div class="bookContent">
                  {{item.book.desc}}
                </div>
              </div>
              <div class="bookBottom">
                <span>{{item.book.author}}</span>
                <div class="numInfor">
                  <span>{{item.book.startsnums}}天前</span>
                  <!--<span>{{item.title}}</span>-->
                  <span>{{item.book.looknums}}人在看</span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import { login } from '@/utils/fetch'

  export default {
    data(){
      return{
        collectBooks: []
      }
    },
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
      },
      getCollectionBook(){
        this.$axios
          .get('/collection').then(res => {
          console.log(res);
          this.collectBooks = res.data
        })
      }
    },
    onShow(){
      this.getCollectionBook()
    }
  }
</script>

<style scoped lang="scss">
  .container{
    padding: 20rpx
  }
  .title {
    border-left: 1px solid #000;
    margin-top: 15px;
    padding-left: 10px;
    height: 15px;
    line-height: 11px;
    span {
      color: #444;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .bookList {
    margin-top: 10px;
    .bookItem {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      .bookPic {
        width: 200rpx;
        height: 125px;
        box-shadow: 0 0 5px #888;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .shuInfor {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 490rpx;
        .bookTitle {
          font-size: 14px;
          color: #444;
        }
        .bookContent {
          margin-top: 5px;
          font-size: 12px;
          color: #666;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
        .bookBottom {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #666;
          .numInfor {
            span {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
</style>
