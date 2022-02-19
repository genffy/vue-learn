<template>
  <div>
    attr options length{{sellerList.length}}
  </div>
</template>
<script>
export default {
  name: 'perf',
  props: {
    sellerList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>