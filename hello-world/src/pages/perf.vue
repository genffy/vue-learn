<template>
<!-- 组件自定义标签属性大小对于性能的影响 -->
  <div>
    <perf :sellerList="sellerList" :permission="permission"/>
  </div>  
</template>
<script>
import perf from '../components/perf'
// import dts from './data-dts';
import menu from './data-menu';
export default {
  name: 'pagePerf',
  components: {
    perf,
  },
  data() {
    return {
      // sellerList: dts.data,
      sellerList: [],
      permission: menu.data.permission,
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>
<style lang="less" scoped>

</style>