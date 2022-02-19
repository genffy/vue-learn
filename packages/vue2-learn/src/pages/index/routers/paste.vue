<template>
<div>
    <textarea class="txt-area" rows="10" @paste="onPaste">

  </textarea>
  <iframePreview ref="preview" />
</div>
  
</template>
<script>
import iframePreview from "../../../components/iframe-preview";
export default {
  name: "Paste",
  components: {
    iframePreview,
  },
  data() {
    return {
      data: [],
      value: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      console.log("init!");
    },
    onPaste(evt) {
      console.log(evt);
      const value = evt.clipboardData.getData("text");
      const html = evt.clipboardData.getData("text/html");
      this.value = value;
      console.log(`${value}`);
      console.log(`${html}`);
      this.$refs['preview'].setIframeContent(html)
    const lines = value.split(/\n/g) || []
    const rows = lines[0].split(/\s/g) || []
      console.log('lines',lines.length, `${lines}`)
      console.log('rows',rows.length, `${rows}`)
    },
    watchPaste() {},
  },
};
</script>
<style lang="less" scoped>
.txt-area {
  width: 100%;
}
</style>
