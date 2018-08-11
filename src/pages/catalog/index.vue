<template>
    <div class="container">
      <div class="cataList">
        <a :href="'/pages/articleDetails/main?id='+item._id" class="listOne" v-for="(item,index) in cataLists" :key="index">
          {{item.title}}
        </a>
      </div>
    </div>
</template>

<script>
  import { axios } from "@/utils/index.js";

  export default {
    name: "index",
    data(){
      return{
        bookId: '',
        cataLists: []
      }
    },
    methods: {
      getCatalog(){
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
    }
  }
</script>

<style scoped>
  .container{
    width: 710rpx;
    margin: 0 auto;
  }
  .listOne{
    height: 66rpx;
    line-height: 66rpx;
    font-size: 16px;
    color: #333;
    border-bottom: 1px solid #333;
  }
</style>
