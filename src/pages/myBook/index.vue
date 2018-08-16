<template>
  <div class="container">
    <img src="/static/imgs/Wedges-3.7s-200px.svg" v-if="isLoading" class="svg-loading">
    <div class="content" v-if="!isLoading">
      <div class="itemBook" v-for="(item,index) in oldBooks" :key="index">
        <div class="bookPic">
          <img :src="item.book.img">
        </div>
        <div class="bookDesc">
          <div class="bookTitle">{{item.book.title}}</div>
          <div class="readProgress">书籍{{item.title.index}}/{{item.title.total}}章</div>
          <div class="itProgress">
            <progress :percent="item.percent"
                      :active="true"
                      stroke-width="4"
                      activeColor="#1296db"
                      backgroundColor="#8a8a8a"
                      class="myProgress"
            />
            <span class="flr">已看{{item.percent}}%</span>
          </div>
          <div class="lastRead">
            <span>上次查看：{{item.title.title}}</span>
            <span>
              <getTime :time="item.updatedTime"></getTime>
            </span>
          </div>
          <div class="btns">
            <button class="btn" @click="handleGoOn(item.title)">继续阅读</button>
            <button class="btn" @click="handleCheck(item)">查看文档</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import getTime from '@/components/getTime'

  export default {
    name: "index",
    components: {
      getTime
    },
    computed: {
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState(['isLoading'])
    },
    data(){
      return{
        oldBooks: []
      }
    },
    methods: {
      getOldBook(){
        // let thisVue = this;
        // this.$fetch.get('/readList', {}, function(res){
        //   console.log(thisVue);
        // })
        this.$fetch.get('/readList', {}, (res) => {
          // console.log(res);
          this.oldBooks = res.data.map(item => {
            item.percent = Math.ceil(item.title.index / item.title.total * 100)
            return item
          })
        })
      },
      handleGoOn(item){
        wx.navigateTo({
          url: '/pages/articleDetails/main?id=' + item._id + '&bookId=' + item.bookId
        })
      },
      handleCheck(item){
        wx.navigateTo({
          url: '/pages/catalog/main?id=' + item.title.bookId
        })
      }
    },
    onShow(){
      this.getOldBook()
    }
  };
</script>

<style scoped lang="scss">
  @import "../../css/myBook";
</style>
