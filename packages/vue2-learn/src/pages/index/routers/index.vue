<template>
  <div>
    demo
    <el-button @click="clickHandle">mock search</el-button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {
  },
  methods: {
    clickHandle() {
      this.$Fetch('/api/search/user').then(res=>{
        console.log('search user', res);
      })
    }
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
