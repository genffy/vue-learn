import Vue from 'vue';
import VueRouter from 'vue-router';
import GenRouters from '@util/router';

// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
// const requireContext = require.context(
//   '@module/index/',
//   true,
//   /\.vue$/
// )

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = GenRouters(require.context(
  './routers/',
  false,
  /\.vue$/
));

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
Vue.use(VueRouter);
export default new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
