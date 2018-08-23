<template>
  <div class="container">
    <!--<test></test>-->
    <!--轮播图-->
    <div class="swiper">
      <swiper indicator-dots="true" autoplay="true" interval="3000" duration="500">
        <block v-for="(item, index) in imgsUrl" :index="index" :key="key">
          <swiper-item>
            <a v-if="item.book" :href="'/pages/bookDesc/main?id='+item.book._id" style="height: 100%">
              <img :src="item.img">
            </a>
            <!--mode="aspectFill"-->
          </swiper-item>
        </block>
      </swiper>
    </div>

    <!--书单-->
    <div v-for="(item,index) in booksUrl" :key="index">
      <div class="title">
        <span class="fll">{{item.title}}</span>
      </div>
      <a :href="'/pages/bookDesc/main?id='+val._id" class="bookList" v-for="(val,ind) in item.books" :key="ind">
        <div class="bookItem">
          <div class="bookPic">
            <img :src="val.img">
          </div>
          <div class="shuInfor">
            <div>
              <div class="bookTitle">
                {{val.title}}
              </div>
              <div class="bookContent">
                {{val.desc}}
              </div>
            </div>
            <div class="bookBottom">
              <span>{{val.author}}</span>
              <div class="numInfor">
                <span>
                  <getTime :time="val.updateTime"></getTime>
                </span>
                <span>{{item.title}}</span>
                <span>{{val.looknums}}人在看</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>

  </div>
</template>

<script>
  import { axios } from "@/utils/index"
  import getTime from '../../components/getTime'

  export default {
    components: {
      getTime
    },
    data() {
      return {
        imgsUrl: [],
        booksUrl: []
      };
    },

    methods: {
      getSwiper() {
        axios.get("/swiper").then(res => {
          // console.log(res);
          this.imgsUrl = res.data;
        });
      },
      getCategory() {
        axios.get("/category/books").then(res => {
          // console.log(res);
          this.booksUrl = res.data;
        });
      }
    },

    created() {
      // 调用应用实例的方法获取全局数据
      this.getSwiper();
      this.getCategory();
    },
    onShareAppMessage () {
      return {
        title: '云书',
        path: '/pages/index/main'
      }
    }
  };
</script>

<style scoped lang="scss">
  .container{
    width: 710rpx;
    margin: 0 auto;
  }
  .swiper {
    width: 710rpx;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
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
</style>
