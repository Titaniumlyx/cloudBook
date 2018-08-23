<template>
  <div class="container">
    <img src="/static/imgs/Wedges-3.7s-200px.svg" v-if="isLoading" class="svg-loading">
    <div v-if="!isLoading">
      <div class="book-item">
        <a :href="'/pages/bookDesc/main?id='+item._id" class="bookList" v-for="(item,index) in itemBooks" :key="index">
          <div class="bookItem">
            <div class="bookPic">
              <img :src="item.img">
            </div>
            <div class="shuInfor">
              <div>
                <div class="bookTitle">
                  {{item.title}}
                </div>
                <div class="bookContent">
                  {{item.desc}}
                </div>
              </div>
              <div class="bookBottom">
                <span>{{item.author}}</span>
                <div class="numInfor">
                <span>
                  <getTime :time="item.updateTime"></getTime>
                </span>
                  <span>{{categoryTitle}}</span>
                  <span>{{item.looknums}}人在看</span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>

      <div class="word" v-if="isOver">
        <span>——没有书了噢——</span>
      </div>
    </div>
  </div>
</template>

<script>
  import getTime from '../../components/getTime'

  export default {
    components: {
      getTime
    },
    data(){
      return{
        categoryId: '',
        itemBooks: [],
        arr: [],
        categoryTitle: '',
        isOver: false,
        isLoad: true,
        isLoading: true,
        pn: 1,
      }
    },
    methods: {
      getData(){
        let titleId = this.categoryId
        this.$axios.get(`/category/${titleId}/books`, {pn: this.pn, size: 4}).then(res => {
          // console.log(res);
          this.categoryTitle = res.data.title
          this.isLoading = false
          this.getBarTitle()
          if(res.data.books.length < 4){
            this.isOver = true;
            this.arr = res.data.books
            this.itemBooks = [...this.itemBooks, ...this.arr]
            this.isLoad = false;
          }else{
            this.arr = res.data.books
            this.itemBooks = [...this.itemBooks, ...this.arr]
          }
        })
        //   .then(() => {
        //   // console.log(this.categoryTitle);
        //   wx.setNavigationBarTitle({
        //     title: this.categoryTitle
        //   })
        // })
      },
      getBarTitle(){
        wx.setNavigationBarTitle({
          title: this.categoryTitle
        })
      },
    },
    onReachBottom(){
      this.isLoading = false
      if(this.isLoad){
        this.pn += 1;
        this.getData()
      }
    },
    onShow(){
      this.isLoad = true
      this.itemBooks = []
      this.pn = 1
      this.getData()
    },
    onLoad(options) {
      // console.log(options);
      this.categoryId = options.id
    },
    onShareAppMessage () {
      return {
        title: this.categoryTitle + '类别图书',
        path: '/pages/typeAllBooks/main?id='+ this.categoryId
      }
    }
  };
</script>

<style scoped lang="scss">
  .container{
    padding: 20rpx
  }
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
  .word{
    font-size: 14px;
    color: #555;
    display: flex;
    justify-content: center;
  }
  .book-item{
    .bookList {
      margin-top: 10px;
      .bookItem {
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;
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
              display: flex;
              justify-content: space-between;
              span {
                margin-left: 5px;
              }
            }
          }
        }
      }
    }
  }
</style>
