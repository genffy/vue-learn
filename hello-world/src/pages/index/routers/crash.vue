<template>
  <div class="crash">
    <h1>{{time}}</h1>
    <button @click="readyToBoom">惦记我crash呀</button><br>
    <button @click="loadCrash">加载crash列表</button><br>
    <button @click="infoOtherPage">通知其他页面</button>
    <h1>{{swData.title}}</h1>
    <h1>{{swData.body}}</h1>
  </div>
</template>
<script>
// 如何监控crash
// crash 时上报哪些信息
export default {
  data() {
    return {
      swData: {},
      time: Date.now(),
    };
  },
  methods: {
    readyToBoom() {
      let txt = "a";
      while (true) {
        txt = txt += "a"; //add as much as the browser can handle
      }
      //[evil laugh] BOOM! All memory used up, and it is now CRASHED!
    },
    loadCrash() {
      /* eslint-disable */
      console.log('加载crash信息');
      window.open('chrome://crashes/');
    },
    infoOtherPage() {
      navigator.serviceWorker.controller.postMessage({
        type: 'info',
        data: {
          'title': '跟你问好',
          'body': '晚饭吃了么',
        } // 附加信息，如果页面 crash，上报的附加数据
      });
    }
  },
  mounted() {
    const self = this;
    navigator.serviceWorker.addEventListener('message', function(event) {
      self.swData = event.data.data;
    });
  },
  create() {}
};
</script>
<style lang="less" scoped>
.crash {

}
</style>