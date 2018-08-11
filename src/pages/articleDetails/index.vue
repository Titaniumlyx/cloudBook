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
          <img src="/static/imgs/1catalog.png">
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
      <!--<div class="cateWrap">-->
        <!--<div class="cateBlock">-->
          <!--<div>我是目录</div>-->
        <!--</div>-->
      <!--</div>-->
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
        fontSize: ''
      }
    },
    methods: {
      async getContent(){
        let articleCon = await axios.get(`/article/${this.articleId}`);
        let cataLists = await axios.get(`/titles/${this.$root.$mp.query.bookId}`);
        this.articleCon = articleCon.data;
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
            console.log(res);
            this.articleCon = res.data;
            this.index--
          })
        }
      },
      handleNext(){
        if(!this.cataLists[this.index + 1]){
          wx.showToast({ title: '这是最后一章' })
        }else{
          axios.get(`/article/${this.cataLists[this.index + 1]._id}`).then(res => {
              console.log(res);
              this.articleCon = res.data;
              this.index++
            })
        }
      }
    },
    onLoad(options) {
      this.articleId = options.id;
      this.getContent()
    },
    onShareAppMessage(obj){
      console.log(obj);
      return{
        title: this.bookMsg.title,
        path: `/pages/bookDesc/main`,
        imageUrl: this.bookMsg.img
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
    width: 100%;
    height: 100%;
    background: rgba(64,64,64,.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 8;
  }
  .cateBlock{
    width: 82%;
    height: 100%;
    background: #fff;
    box-shadow: 4px 0 4px #ccc;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  }
</style>
