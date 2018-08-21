<template>
<div>我是test</div>
</template>

<script>
  export default {
    methods: {
      async test(){
        const promise = new Promise((resolve) => {
          setTimeout(() => {
            this.msg = '998'
            resolve()
          },1000)
        })
        // console.log(this.msg);  //undefined
        await promise
        // console.log(this.msg);  //998
      },
      test1(){
        this.test().then(() => {
          console.log(this.msg);   //998
        })
      }
    },
    created(){
      this.test()
      this.test1()
    }
  };
</script>

<style scoped lang="scss">

</style>
