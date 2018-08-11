<template>
  <div class="test-container">
    <button type="primary" class="btn" @click="handleClick">测试按钮</button>
    <div class="box" v-if="isShow" ></div>
    <!--v-html="html"-->
    <button type="primary" @click="count++">+</button>
    <count :num="count"></count>
    <button type="primary" @click="count--">+</button>
  </div>
</template>

<script>
  import count from '@/components/num'

  export default {
    name: "index",
    components: {
      count
    },
    data(){
      return{
        isShow: false,
        html: '<h1>我是盒子里的h1</h1>',
        count: '5'
      }
    },
    methods: {
      handleClick(){
        this.isShow = !this.isShow
      }
    }
  }
</script>

<style scoped>
  .box{
    width: 100px;
    height: 100px;
    background: #f00;
  }
  .btn{
    width: 200 rpx;
    height: 100 rpx;
    line-height: 100rpx;
    text-align: center;
    color: brown;
  }
</style>
