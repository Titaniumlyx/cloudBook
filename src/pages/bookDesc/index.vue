<template>
  <div class="container">
    <!--顶部-->
    <div class="bookTop">
      <div class="bookImg">
        <img :src="bookMsg.img">
      </div>
      <div class="bookInfor">
        <div class="title">{{bookMsg.title}}</div>
        <div class="author one">作者：{{bookMsg.author}}</div>
        <div class="lookNum one">{{bookMsg.looknums}}人在看</div>
        <div class="likeNum one">{{bookMsg.startsnums}}人喜欢</div>
      </div>
    </div>
    <!--分享-->
    <div class="collect">
      <button class="collectBtn">加入收藏</button>
      <button class="collectBtn" open-type="share">分享好友</button>
      <button class="collectBtn" @click="handleShare">分享朋友圈</button>
    </div>
    <!--简介-->
    <div class="summary">
      <div class="summaryT">简介</div>
      <div class="summaryContent">
        {{bookMsg.desc}}
      </div>
    </div>
    <!--目录-->
    <div class="catalog" @click="handleRead">
      <div class="catalog2">
        <span class="check">查看目录</span>
        <span>共{{chapterNum}}章</span>
      </div>
      <div class="renew">更新于两天前 ></div>
    </div>
    <!--阅读-->
    <div class="readBook">
      <button @click="handleRead">阅读该书籍</button>
    </div>

  </div>
</template>

<script>
  import { axios } from "@/utils/index.js";

  export default {
    data() {
      return {
        bookId: '',
        bookMsg: {},
        chapterNum: ''
      };
    },
    methods: {
      getBookDesc(){
        axios.get(`/book/${this.bookId}`).then(res => {
          // console.log(res);
          this.bookMsg = res.data;
          this.chapterNum = res.length;
        })
      },
      handleShare(){
        //微信弹窗
        wx.showModal({
          title: '提示',
          content: '该功能将在上线后逐步完善',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      handleRead(){
        wx.navigateTo({
          url: `/pages/catalog/main?id=${this.bookId}`
        })
      }
    },
    onLoad(options) {
      // console.log(options); 获取点击书本的id
      this.bookId = options.id
      this.getBookDesc()
    },
    //与open-type="share" 搭配使用，return里显示分享的内容
    onShareAppMessage(obj){
      console.log(obj);
      return{
        title: this.bookMsg.title,
        path: `/pages/bookDesc/main?id=${this.bookId}`,
        imageUrl: this.bookMsg.img
      }
    }
  }
</script>

<style scoped lang="scss">
  .container{
    width: 710rpx;
    margin: 0 auto;
  }
  .bookTop {
    padding-bottom: 10px;
    width: 710rpx;
    display: flex;
    justify-content: space-between;
    .bookImg {
      width: 240rpx;
      height: 150px;
      box-shadow: 0 0 5px #aaa;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .bookInfor {
      width: 450rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 14px;
        color: #333;
        font-weight: 700;
      }
      .one {
        font-size: 12px;
        color: #666;
      }
    }
  }
  .collect {
    padding: 20rpx 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 7rpx solid #e9e9e9;
    .collectBtn {
      width: 30%;
      background: #e9e9e9;
      font-size: 12px;
      color: #444;
      border: none;
      &::after {
        border: none;
      }
    }
  }
  .summary {
    margin-top: 20rpx;
    border-bottom: 1px solid #e9e9e9;
    .summaryT{
      font-size: 16px;
      font-weight: 700;
      color: #333;
      margin-bottom: 26rpx;
    }
    .summaryContent{
      font-size: 12px;
      color: #555;
      text-indent: 2em;
      margin-bottom: 20rpx;
    }
  }
  .catalog{
    display: flex;
    justify-content: space-between;
    border-bottom: 7rpx solid #e9e9e9;
    line-height: 80rpx;
    height: 80rpx;
    color: #555;
    .catalog2{
      display: flex;
      font-size: 12px;
      .check{
        font-size: 14px;
        color: #333;
        font-weight: 700;
        margin-right: 10px;
      }
    }
    .renew{
      font-size: 10px;
    }
  }
  .readBook{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60rpx;
    padding: 20rpx 30rpx;
    font-size: 12px;
    box-shadow: 0 0 5px rgba(0,0,0,.3);
    button{
      color: #fff;
      background: #409eff;
      font-size: 12px;
      width: 710rpx;
      height: 60rpx;
    }
  }
</style>
