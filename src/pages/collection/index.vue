<template>
  <div class="container">
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
    <div class="word">
      <span>——没有更多了，发现好书去收藏吧——</span>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        collectBooks: [],
      }
    },
    methods: {
      getCollectionBook(){
        this.$axios.get('/collection').then(res => {
          // console.log(res);
          this.collectBooks = res.data
        })
      }
    },
    onShow(){
      this.getCollectionBook()
    }
  };
</script>

<style scoped lang="scss">
  .container{
    padding: 20rpx;
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
