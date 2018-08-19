<template>
    <div class="container">
      <img src="/static/imgs/Wedges-3.7s-200px.svg" v-if="isLoading" class="svg-loading">
      <div class="cataList" v-if="!isLoading">
        <a :href="'/pages/articleDetails/main?id='+ item._id + '&bookId=' + bookId" class="listOne" v-for="(item,index) in cataLists" :key="index">
          {{item.title}}
        </a>
      </div>
    </div>
</template>

<script>
  import { axios } from "@/utils/index"
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(['isLoading'])
    },
    data(){
      return{
        bookId: '',
        cataLists: []
      }
    },
    methods: {
      getCatalog(){
        this.cataLists = {}
        axios.get(`/titles/${this.bookId}`).then(res => {
          // console.log(res);
          this.cataLists = res.data
        })
      }
    },
    onLoad(options) {
      // console.log(options); 获取点击书本的id
      this.bookId = options.id;
      this.getCatalog()
    },
    onShareAppMessage () {
      return {
        title: this.cataLists[0].title,
        path: '/pages/catalog/main?id=' + this.bookId
      }
    }
  }
</script>

<style scoped>
  .container{
    width: 710rpx;
    margin: 0 auto;
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
  .listOne{
    height: 66rpx;
    line-height: 66rpx;
    font-size: 16px;
    color: #333;
    border-bottom: 1px solid #333;
  }
</style>
