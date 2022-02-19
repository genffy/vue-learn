import Vue from 'vue';
import VueRouter from 'vue-router';
import GenRouters from '@util/router';

const routes = GenRouters(require.context(
  './routers/',
  false,
  /\.vue$/
));
Vue.use(VueRouter);
export default new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
