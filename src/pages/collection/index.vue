<template>
  <div class="container">
    <img src="/static/imgs/Wedges-3.7s-200px.svg" v-if="isLoading" class="svg-loading">
    <div v-if="!isLoading">
      <div>
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
      <div class="word" v-if="isOver">
        <span>——没有更多了，发现好书去收藏吧——</span>
      </div>
    </div>
  </div>
</template>

<script>
  // import { mapState } from 'vuex'

  export default {
    // computed: {
    //   ...mapState(['isLoading'])
    // },
    data(){
      return{
        collectBooks: [],
        arr: [],
        pn: 1,
        isOver: false,
        isLoading: true
      }
    },
    methods: {
      getCollectionBook(){
        this.$axios.get('/collection',{pn: this.pn, size: 4}
        ).then(res => {
          // console.log(res);
          this.isLoading = false
          if(res.data.length === 0){
            this.isOver = true;
          }
          else{
            this.arr = res.data;
            this.collectBooks = [...this.collectBooks,...this.arr]
          }
        })
      }
    },
    onReachBottom(){
      this.isLoading = false
      if(!this.isOver){
        // console.log('加载更多...')
        this.pn += 1;
        this.getCollectionBook()
      }
    },
    onShow(){
      this.getCollectionBook()
    },
    onShareAppMessage () {
      return {
        title: '我的收藏',
        path: '/pages/collection/main'
      }
    }
  };
</script>

<style scoped lang="scss">
  .container{
    padding: 20rpx;
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
  }
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
            span {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
</style>
