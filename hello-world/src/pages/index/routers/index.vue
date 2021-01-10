<template>
  <div>
    <img alt="Vue logo" src="@assets/logo.png">
    <button @click="clickHandle">惦记我</button>
    <HelloWorld ref="hello" msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
const HelloWorld =(resolve)=> require(['@component/HelloWorld.vue'], resolve)
// import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'Index',
  components: {
    HelloWorld
  },
  methods: {
    clickHandle() {
      this.$refs.hello.getData();
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
