<template>
    <div>
      {{str}}
    </div>
</template>

<script>
    export default {
      props: {
        time: {
          type: [String, Number]
        }
      },
      data(){
        return{
          str: '',
          timestamp: ''
        }
      },
      methods: {
        getUpdateTime(){     // 获取后端给的时间戳的具体时间
          const time = new Date(this.time);
          const year = time.getFullYear();
          const month = time.getMonth() + 1;
          const day = time.getDate();
          return `${year}年${month}月${day}日`
        },
        getTimestamp(){
          const dateTime = new Date(this.time);// 转换获取后端给的时间戳
          this.timestamp = Math.round(dateTime.getTime() / 1000);  //得到的是毫秒，转换为秒
          return this.timestamp
        },
        getNowUnix(){    // 获取现在的时间戳
           const nowTime = new Date();
           let unix = Math.round(nowTime.getTime() / 1000);
           return unix
        },
        getLingTime(){   // 获取今天0时0分0秒的时间戳
          const lingTime = new Date;
          lingTime.setHours(0);
          lingTime.setMinutes(0);
          lingTime.setSeconds(0);
          lingTime.setMilliseconds(0);
          const unix = Math.round(lingTime.getTime() / 1000);
          return unix;
        },
        getTimeStr(){   // 计算得到所需时间字符串
          const timestamp = this.getTimestamp();
          const nowUnix = this.getNowUnix();
          const lingTime = this.getLingTime();

          if(nowUnix - timestamp >= 0 && nowUnix - timestamp < 3600){
            this.str = Math.floor((nowUnix - timestamp) / 60) + '分钟前'
          }else if(timestamp - lingTime >= 0){
            this.str = Math.round((nowUnix - timestamp) / 3600) + '小时前'
          }else if(nowUnix - timestamp >= 24*3600 && nowUnix - timestamp <= 31*24*3600){
            this.str = Math.round((nowUnix - timestamp) / (24*3600)) + '天前'
          }else{
            this.str = this.getUpdateTime()
          }
        }
      },
      mounted (){
        this.getTimeStr();
      },
      computed: {   //用computed，上面可以写onShow。 computed有监听属性   刚开始就执行，数据改变时也执行
        setDate(){
          this.getTimeStr()
          return this.time
        }
      }
      // watch: {   //不能用onShow    在数据改变时执行
      //   time(val){
      //     // console.log('val',val)
      //     this.getTimeStr()
      //   }
      // }
    }
</script>

<style scoped>

</style>
