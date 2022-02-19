<template>
  <div>
    <div id="loading">
      <!-- <div
        style="
          bottom: 0;
          left: 0;
          overflow: hidden;
          position: absolute;
          right: 0;
          top: 0;
        "
      >
        <div class="la-i">
          <div
            style="
              animation: 1.7s cubic-bezier(0.17, 0, 0.1, 0.87) 1.2s kf-s;
              background: #fafbfb;
              border-radius: 330px;
              height: 660px;
              left: 50%;
              margin: -406px -330px;
              top: 50%;
              transform: scale(0);
              width: 660px;
            "
          ></div>
        </div>
      </div>
      <div style="height: 100%; text-align: center">
        <div style="height: 50%; margin: 0 0 -158px"></div>
        <div class="la-c">
          <div class="la-s"></div>
          <div class="la-t"></div>
          <div class="la-r">
            <div class="la-s"></div>
            <div class="la-t"></div>
          </div>
          <div
            style="
              animation: 1.6s cubic-bezier(0, 0, 0.19, 0.82) 1.2s forwards kf-c;
              transform: scale(1.9);
              transform-origin: 110px 203px;
            "
          >
            <div class="la-s" style="background: #4285f4"></div>
            <div class="la-t" style="background: #c5221f"><div></div></div>
            <div class="la-r">
              <div class="la-s" style="background: #34a853"></div>
              <div class="la-t" style="background: #fbbc04"><div></div></div>
            </div>
          </div>
          <div class="la-m"></div>
          <div class="la-r"><div class="la-m"></div></div>
          <div class="la-i">
            <div class="la-m"></div>
            <div class="la-r"><div class="la-m"></div></div>
          </div>
        </div>
        <div id="nlpt"></div>
        <div
          style="animation: a-s 0.25s 1.25s 1 forwards; opacity: 0"
          class="msg"
        >
          正在加载 Gmail
        </div>
      </div> -->
      <div style="height:100%;text-align:center"><div style="height:50%;margin:0 0 -158px"></div><div class="la-c"><div class="la-s"></div><div class="la-t"></div><div class="la-r"><div class="la-s"></div><div class="la-t"></div></div><div style="animation:1.6s cubic-bezier(0,0,.19,.82)1.2s forwards kf-c;transform:scale(1.9);transform-origin:110px 203px"><div class="la-s" style="background:#4285f4"></div><div class="la-t" style="background:#c5221f"><div></div></div><div class="la-r"><div class="la-s" style="background:#34a853"></div><div class="la-t" style="background:#fbbc04"><div></div></div></div></div><div class="la-m"></div><div class="la-r"><div class="la-m"></div></div><div class="la-i"><div class="la-m"></div><div class="la-r"><div class="la-m"></div></div></div></div><div id="nlpt"></div><div style="animation:a-s .25s 1.25s 1 forwards;opacity:0" class="msg">正在加载 Gmail</div></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "gmail",
  data() {
    return {};
  },
  mounted() {},
  created() {},
};
</script>
<style scoped>
body {
  margin: 0;
  width: 100%;
  height: 100%;
}
body,
td,
input,
textarea,
select,
#loading {
  font-family: arial, sans-serif;
}
input,
textarea,
select {
  font-size: 100%;
}
#loading {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: #fff;
}
.msg {
  color: #757575;
  font-size: 20px;
  letter-spacing: 0.2px;
  line-height: 20px;
  text-align: center;
}
#nlpt {
  animation: a-s 0.5s 2.5s 1 forwards;
  background-color: #f1f1f1;
  height: 4px;
  margin: 56px auto 20px;
  opacity: 0;
  overflow: hidden;
  position: relative;
  width: 300px;
}
#nlpt::before {
  animation: a-lb 20s 3s linear forwards;
  background-color: #db4437;
  content: "";
  display: block;
  height: 100%;
  position: absolute;
  transform: translateX(-300px);
  width: 100%;
}
@keyframes a-lb {
  0% {
    transform: translateX(-300px);
  }
  5% {
    transform: translateX(-240px);
  }
  15% {
    transform: translateX(-30px);
  }
  25% {
    transform: translateX(-30px);
  }
  30% {
    transform: translateX(-20px);
  }
  45% {
    transform: translateX(-20px);
  }
  50% {
    transform: translateX(-15px);
  }
  65% {
    transform: translateX(-15px);
  }
  70% {
    transform: translateX(-10px);
  }
  95% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(-5px);
  }
}
@keyframes a-s {
  100% {
    opacity: 1;
  }
}
@keyframes a-h {
  100% {
    opacity: 0;
  }
}
@keyframes a-nt {
  100% {
    transform: none;
  }
}
@keyframes a-e {
  43% {
    animation-timing-function: cubic-bezier(0.8, 0, 0.2, 1);
    transform: scale(0.75);
  }
  60% {
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    transform: translateY(-16px);
  }
  77% {
    animation-timing-function: cubic-bezier(0.16, 0, 0.2, 1);
    transform: none;
  }
  89% {
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    transform: translateY(-5px);
  }
  100% {
    transform: none;
  }
}
@keyframes a-ef {
  24% {
    animation-timing-function: cubic-bezier(0.8, 0, 0.6, 1);
    transform: scaleY(0.42);
  }
  52% {
    animation-timing-function: cubic-bezier(0.63, 0, 0.2, 1);
    transform: scaleY(0.98);
  }
  83% {
    animation-timing-function: cubic-bezier(0.8, 0, 0.84, 1);
    transform: scaleY(0.96);
  }
  100% {
    transform: none;
  }
}
@keyframes a-efs {
  24% {
    animation-timing-function: cubic-bezier(0.8, 0, 0.6, 1);
    opacity: 0.3;
  }
  52% {
    animation-timing-function: cubic-bezier(0.63, 0, 0.2, 1);
    opacity: 0.03;
  }
  83% {
    animation-timing-function: cubic-bezier(0.8, 0, 0.84, 1);
    opacity: 0.05;
  }
  100% {
    opacity: 0;
  }
}
@keyframes a-es {
  24% {
    animation-timing-function: cubic-bezier(0.8, 0, 0.6, 1);
    transform: rotate(-25deg);
  }
  52% {
    animation-timing-function: cubic-bezier(0.63, 0, 0.2, 1);
    transform: rotate(-42.5deg);
  }
  83% {
    animation-timing-function: cubic-bezier(0.8, 0, 0.84, 1);
    transform: rotate(-42deg);
  }
  100% {
    transform: rotate(-43deg);
  }
}
.la-c {
  animation: 3.6s cubic-bezier(0.03, 0, 0.17, 0.67) kf-e;
  border-radius: 22px 22px 15px 15px;
  height: 165px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  width: 220px;
}
.la-c *,
.la-i,
.la-i * {
  height: 100%;
  position: absolute;
  width: 100%;
}
.la-i {
  animation: 0.9s linear 1.2s kf-v;
  opacity: 0;
}
.la-r {
  transform: scale(-1, 1);
}
.la-s {
  background: #f1f3f4;
  height: 142px;
  left: 0;
  top: 41px;
  width: 50px;
}
.la-t {
  background: #f1f3f4;
  height: 65px;
  left: 0;
  top: 19px;
  transform: skew(0, 37deg);
  width: 110px;
}
.la-t > div {
  background: #ea4335;
  left: 50px;
  width: 60px;
}
.la-m {
  border: 0 solid #fff;
  border-radius: 72px 0 0 0;
  border-width: 50px 0 0 50px;
  height: 22px;
  left: -31px;
  top: -36px;
  transform: rotate(37deg);
  width: 116px;
}
.la-i .la-m {
  border-color: #fafbfb;
}
@keyframes kf-e {
  0% {
    opacity: 0;
    transform: scale(0.72);
  }
  33% {
    animation-timing-function: cubic-bezier(0.21, 0.02, 0.03, 0.92);
    opacity: 1;
    transform: scale(0.8);
  }
  50% {
    animation-timing-function: linear;
    transform: scale(0.96);
  }
}
@keyframes kf-c {
  25% {
    animation-timing-function: cubic-bezier(0.17, 0.98, 0.38, 1);
    transform: scale(1.1);
  }
  to {
    transform: none;
  }
}
@keyframes kf-s {
  35% {
    animation-timing-function: cubic-bezier(0.17, 0.34, 0.69, 0.78);
    transform: scale(0.88);
  }
  to {
    transform: none;
  }
}
@keyframes kf-v {
  66% {
    animation-timing-function: cubic-bezier(0.3, 0, 0.83, 0.83);
    opacity: 1;
  }
}
.invfr {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 0;
  height: 0;
  border: 0;
}
.msgb {
  position: absolute;
  right: 0;
  font-size: 12px;
  font-weight: normal;
  color: #000;
  padding: 20px;
}
</style>