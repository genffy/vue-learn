<template>
  <div id="app">
    <el-button @click="remoteGet">mock everything</el-button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    remoteGet() {
      this.$Fetch('/api/transaction/list').then(res=>{
        console.log('mock', res);
      })
    }
  },
  mounted() {

  },
  created() {
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
