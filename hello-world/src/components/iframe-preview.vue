<template>
  <div></div>
</template>
<script>
function generateGuid() {
    return Math.random()
}
export default {
  name: 'IframePreview',
  props: {
    
  },
  data() {
    return {
      data: [],
      iframeOnReadyStateChangeMessage: `IFRAME_ON_READ_STATE_CHANGE_${generateGuid()}`,
      iframeLoadedMessage: `IFRAME_LOADED_${generateGuid()}`,
      iframeEl: null,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      console.log('init!')
      this.listenForEvents();
      this.initIframe();
    },
    initIframe() {
      this.iframeEl = document.createElement('iframe');
      this.iframeEl.setAttribute('style', 'visibility: hidden; position: absolute; top: -99999px; border: none;');
      this.$el.appendChild(this.iframeEl);
      this.setIframeContent();
    },
    setIframeContent(content = '') {
        if (this.iframeEl.contentWindow === null) {
        setTimeout(this.setIframeContent)
        return;
      }
      const iframeDoc = this.iframeEl.contentWindow.document;
    //   iframeDoc.open()
    //     .write(` <body onload="document.write('${content}'); parent.postMessage('${this.iframeLoadedMessage}', '*')"></body>
    //       <script>
    //         window.document.onreadystatechange = function () {
    //           if (window.document.readyState === 'complete') {
    //             parent.postMessage('${this.iframeOnReadyStateChangeMessage}', '*')
    //           }
    //         };
    //       <\/script>`);
        iframeDoc.open().write(content)
      iframeDoc.close(); //iframe onload event happens
      this.iframeEl.setAttribute('style', 'visibility: visible; border: none;');
    },
    listenForEvents() {
      // Create IE + others compatible event handler
      const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
      const eventer = window[eventMethod];
      const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
      // Listen to message from child window
      eventer(messageEvent, event => {
        if (event.data === this.iframeLoadedMessage) {
          this.$emit('iframe-load');
          this.iframeEl.setAttribute('style', 'visibility: visible; border: none;');
        }
        if (event.data === this.iframeOnReadyStateChangeMessage) {
          this.$emit('load');
        }
      }, false);
    }
  },
}
</script>
<style lang="less" scoped>
</style>
