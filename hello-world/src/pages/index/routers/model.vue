<template>
  <input class="input-style" type="text" v-model="val" @change="handleChange">
</template>
<script>
export default {
  name: 'Model',
  data() {
    return {
      val: '说话'
    }
  },
  methods: {
    handleChange() {
        console.log(this.val)
    }
  },
}
</script>
<style lang="less" scoped>
.input-style {
  border: 1px solid red;
}
</style>
