<template>
    <div class="container">
      <!--<img src="/static/imgs/Wedges-3.7s-200px.svg" v-if="isLoading" class="svg-loading">-->
      <div v-if="!isLoading">
        <div v-if="articleCon.title" :style="fontSize" class="articleCon">
          <wemark :md="articleCon.article.content" link :highlight="true" type="rich-text"></wemark>
        </div>
        <div class="iconWrap">
          <div class="icon">
            <img src="/static/imgs/1left.png" @click="handleLast">
          </div>
          <div class="icon">
            <img src="/static/imgs/1catalog.png" @click="handleShow">
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
        <div class="cateWrap" v-show = "isShow" @click="handleNothing"></div>
        <scroll-view class="cateBlock" :scroll-y="true" :style="{transform: 'translateX(' + trans + ')'}">
          <div class="itemOne" v-for="(item,index) in cataLists" :key="index" @click="getClickArt(item._id)" :style="item._id == articleId? 'background: #A5A0A0' : ''">{{item.title}}</div>
        </scroll-view>
      </div>
    </div>
</template>

<script>
  import { axios,loading } from "@/utils/index";
  import { mapState } from 'vuex'

  export default {
    computed: {
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState(['isLoading'])
    },
    data(){
      return{
        articleId: '',
        articleCon: {},
        cataLists: [],
        sizeValue: 125,
        index: 0,
        fontSize: '',
        isShow: false,
        trans: 0,
        title:''
      }
    },
    methods: {
      initNone(){
        this.articleCon = {}
      },
      async getContent(){
        this.handleNothing();
        this.initNone();
        loading.show();
        let articleCon = await axios.get(`/article/${this.articleId}`);
        let cataLists = await axios.get(`/titles/${this.$root.$mp.query.bookId}`);
        this.articleCon = articleCon.data;
        this.cataLists = cataLists.data;
        // console.log(this.articleCon.title);
        this.index = this.cataLists.findIndex(item => item._id === this.articleId)
        // wx.setNavigationBarTitle({
        //   title: this.articleCon.title
        // })
      },
      getBarTitle(){
        this.getContent().then(() => {    //async函数返回的是一个promise对象
          wx.setNavigationBarTitle({
            title: this.articleCon.title
          })
        })
        // console.log(this.articleCon.title);
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
        this.handleNothing();
        // console.log(this.cataLists);
        if(!this.cataLists[this.index - 1]){
          wx.showToast({ title: '已经是第一章了' })
        }else{
          loading.show();
          this.initNone();
          axios.get(`/article/${this.cataLists[this.index - 1]._id}`).then(res => {
            // console.log(res);
            this.articleCon = res.data;
            this.articleId = this.cataLists[this.index - 1]._id;
            this.index = this.cataLists.findIndex(item => item._id === this.cataLists[this.index - 1]._id)
            // this.index--;
            wx.setNavigationBarTitle({
              title: this.articleCon.title
            })
          })
        }
      },
      handleNext(){
        this.handleNothing();
        if(!this.cataLists[this.index + 1]){
          wx.showToast({ title: '这是最后一章' })
        }else{
          loading.show();
          this.initNone();
          axios.get(`/article/${this.cataLists[this.index + 1]._id}`).then(res => {
              // console.log(res);
              this.articleCon = res.data;
              this.articleId = this.cataLists[this.index + 1]._id;
              this.index = this.cataLists.findIndex(item => item._id === this.cataLists[this.index + 1]._id);
              // this.index++;
              wx.setNavigationBarTitle({
                title: this.articleCon.title
              })
            })
        }
      },
      handleNothing(){
        this.isShow = false;
        this.trans = '-600rpx';
      },
      handleShow(){
        this.isShow = true;
        this.trans = 0;
      },
      getClickArt(val){
        this.handleNothing();
        loading.show();
        this.initNone();
        axios.get(`/article/${val}`).then(res => {
          this.articleCon = res.data;
          this.articleId = val;
          this.index = this.cataLists.findIndex(item => item._id === val)
        })
      }
    },
    onLoad(options) {
      this.articleId = options.id;
      this.getContent();
      this.getBarTitle()
    },
    onShareAppMessage(obj){
      // console.log(obj);
      return{
        title: this.articleCon.title,
        path: '/pages/articleDetails/main?id=' + this.articleId,
        // imageUrl: this.bookMsg.img
      }
    },
    onShow(){
      this.fontSize = `font-size: ${this.sizeValue}%`;
    }
  }
</script>
<!--// find()函数用来查找目标元素，找到就返回该元素，找不到返回undefined。-->
<!--// findIndex()函数也是查找目标元素，找到就返回第一个元素的索引位置，找不到就返回-1-->

<!--// 使用微信的页面跳转方法，然后跳转页面使用this.$root.$mp.query获取参数-->
<!--// 通过 this.$root.$mp.query 进行获取小程序在 page onLoad 时候传递的 options。-->
<!--// 使用this.$root.$mp.query获取参数需要在mounted中获取，在created中会报Cannot read property 'query' of undefined-->
<style scoped lang="scss">
  .svg-loading{
    display: block;
    width: 200rpx;
    height: 200rpx;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
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
    /*width: 20%;*/
    /*height: 100%;*/
    background: rgba(64,64,64,.5);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
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
    transition: transform .3s linear;
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
