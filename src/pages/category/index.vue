<template>
    <div class="container">
      <img src="/static/imgs/Wedges-3.7s-200px.svg" v-if="isLoading" class="svg-loading">
      <div v-if="!isLoading">
        <div class="category-item" v-for="(item,index) in categorys" :key="index">
          <!--上边类别-->
          <div class="icon-wrap" @click="handleMore(item._id)">
            <div class="icon-block">
              <div class="icon">
                <img :src="item.icon">
              </div>
              <span class="icon-word">{{item.title}}</span>
            </div>
            <span class="more"> > </span>
          </div>
          <!--类别内容-->
          <div class="icon-content">
            <div class="book-item">
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

        </div>
        <div class="word" v-if="isOver">
          <span>——没有类别了，好好学习噢——</span>
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
        categorys: [],
        arr: [],
        isOver: false,
        pn: 1,
        isLoading: true
      }
    },
    methods: {
      getData(){
        this.$axios.get('/category/books',{pn: this.pn, size: 2, booksSize: 2}).then(res => {
          // console.log(res);
          this.isLoading = false
          if(res.data.length === 0){
            this.isOver = true;
          }else{
            this.arr = res.data
            this.categorys = [...this.categorys, ...this.arr]
          }
        })
      },
      handleMore(id){
        wx.navigateTo({
          url: '/pages/typeAllBooks/main?id='+ id
        })
      }
    },
    onReachBottom(){
      this.isLoading = false
      if(!this.isOver){
        // console.log('加载更多...')
        this.pn += 1;
        this.getData()
      }
    },
    onLoad(){
      this.getData()
    },
    onShareAppMessage () {
      return {
        title: '所有分类',
        path: '/pages/category/main'
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '../../css/category';
</style>
