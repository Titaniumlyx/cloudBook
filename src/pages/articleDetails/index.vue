<template>
    <div class="container">
      <div v-if="articleCon.title" :style="fontSize" class="articleCon">
        <wemark :md="articleCon.article.content" link :highlight="true"></wemark>
      </div>
      <div class="iconWrap">
        <div class="icon">
          <img src="/static/imgs/1left.png" @click="handleLast">
        </div>
        <div class="icon">
          <img src="/static/imgs/1catalog.png" @click="handleChange">
        </div>
        <div class="icon ALargen" @click="handleAddWord">
          <img src="/static/imgs/1A+.png">
        </div>
        <div class="icon ASmall" @click="handleSmallWord">
          <img src="/static/imgs/1A-.png">
        </div>
        <div class="icon" @click="handleNext">
          <img src="/static/imgs/1right.png">
        </div>
      </div>
      <!--目录盒子-->
      <div class="cateWrap" v-show = "isShow" @click="handleNothing">
        <scroll-view class="cateBlock" :scroll-y="true" :style="{transform: 'translateX(' + trans + ')'}" @click.stop="">
          <div class="itemOne" v-for="(item,index) in cataLists" :key="index" @click="getClickArt(item._id)" :style="item._id == articleId? 'background: #A5A0A0' : ''">{{item.title}}</div>
        </scroll-view>
      </div>
    </div>
</template>

<script>
  import { axios } from "@/utils/index.js";

  export default {
    name: "index",
    data(){
      return{
        articleId: '',
        articleCon: {},
        cataLists: [],
        sizeValue: 100,
        index: 0,
        fontSize: '',
        isShow: false,
        trans: ''
      }
    },
    methods: {
      async getContent(){
        let articleCon = await axios.get(`/article/${this.articleId}`);
        let cataLists = await axios.get(`/titles/${this.$root.$mp.query.bookId}`);
        this.articleCon = articleCon.data;
        // console.log(articleCon.data);
        this.cataLists = cataLists.data;
        this.index = this.cataLists.findIndex(item => item._id === this.articleId)
      },
      handleAddWord(){
        this.sizeValue = this.sizeValue + 2;
        this.fontSize = `font-size: ${this.sizeValue}%`
      },
      handleSmallWord(){
        this.sizeValue = this.sizeValue - 2;
        this.fontSize = `font-size: ${this.sizeValue}%`
      },
      handleLast(){
        // console.log(this.cataLists);
        if(!this.cataLists[this.index - 1]){
          wx.showToast({ title: '已经是第一章了' })
        }else{
          axios.get(`/article/${this.cataLists[this.index - 1]._id}`).then(res => {
            // console.log(res);
            this.articleCon = res.data;
            this.articleId = this.cataLists[this.index - 1]._id;
            this.index = this.cataLists.findIndex(item => item._id === this.cataLists[this.index - 1]._id)
            // this.index--;
          })
        }
      },
      handleNext(){
        if(!this.cataLists[this.index + 1]){
          wx.showToast({ title: '这是最后一章' })
        }else{
          axios.get(`/article/${this.cataLists[this.index + 1]._id}`).then(res => {
              // console.log(res);
              this.articleCon = res.data;
              this.articleId = this.cataLists[this.index + 1]._id;
              this.index = this.cataLists.findIndex(item => item._id === this.cataLists[this.index + 1]._id);
              // this.index++;
            })
        }
      },
      handleNothing(){
        this.isShow = false;
      },
      handleChange(){
        this.isShow = !this.isShow;
        if(this.isShow){
          this.trans = 0;
        }else{
          this.trans = '-600rpx'
        }
      },
      getClickArt(val){
        this.handleChange();
        axios.get(`/article/${val}`).then(res => {
          this.articleCon = res.data;
          this.articleId = val;
          this.index = this.cataLists.findIndex(item => item._id === val)
        })
      }
    },
    onLoad(options) {
      this.articleId = options.id;
      this.getContent()
    },
    onShareAppMessage(obj){
      // console.log(obj);
      return{
        title: this.articleCon.title,
        path: '/pages/articleDetails/main?id=' + this.articleId,
        // imageUrl: this.bookMsg.img
      }
    }
  }
</script>
<!--// find()函数用来查找目标元素，找到就返回该元素，找不到返回undefined。-->
<!--// findIndex()函数也是查找目标元素，找到就返回第一个元素的索引位置，找不到就返回-1-->

<!--// 使用微信的页面跳转方法，然后跳转页面使用this.$root.$mp.query获取参数-->
<!--// 通过 this.$root.$mp.query 进行获取小程序在 page onLoad 时候传递的 options。-->
<!--// 使用this.$root.$mp.query获取参数需要在mounted中获取，在created中会报Cannot read property 'query' of undefined-->
<style scoped lang="scss">
  .articleCon{
    width: 710rpx;
    margin: 0 auto;
  }
  .iconWrap{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    box-shadow: 0 0 3px #888;
    .icon img{
        width: 60rpx;
        height: 60rpx;
    }
    .ALargen img{
        width: 70rpx;
        height: 70rpx;
    }
    .ASmall img{
      width: 58rpx;
      height: 58rpx;
    }
  }
  .cateWrap{
    width: 20%;
    height: 100%;
    background: rgba(64,64,64,.5);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    /*left: 0;*/
    z-index: 8;
    /*animation: moveBig linear .5s;*/
  }
  /*<!--@keyframes moveBig {-->*/
    /*<!--from {left: -750rpx;}-->*/
    /*<!--to{left: 0}-->*/
  /*<!--}-->*/
  .cateBlock{
    /*padding: 10rpx 20rpx;*/
    width: 600rpx;
    height: 100%;
    background: #fff;
    box-shadow: 4px 0 4px #ccc;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    transition: transform 3s linear;
    /*animation: moveSmall linear .5s;*/
    .itemOne{
      border-bottom: 1px solid #f1f1f1;
      height: 66rpx;
      line-height: 66rpx;
      font-size: 16px;
      color: #333;
      padding-left: 40rpx;
    }
  }
  /*@keyframes moveSmall {
    from {left: -615rpx;}
    to{left: 0}
  }*/
</style>
