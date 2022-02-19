import Vue from 'vue'
import App from './App.vue'
import router from './router';
import ElementUI, {
  Message,
  Notification,
  MessageBox,
  Loading,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import fetch from '@util/fetch';
import moment from 'moment';
import 'normalize.css'

Vue.config.productionTip = false
Vue.prototype.$Fetch = fetch;


Vue.use(ElementUI);
Vue.prototype.$Message = Message
Vue.prototype.$Notice = Notification
Vue.prototype.$Confirm = MessageBox.confirm
Vue.prototype.$Alert = MessageBox.alert
Vue.prototype.$Msgbox = MessageBox
Vue.prototype.$Prompt = MessageBox.prompt
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
// 默认大小处理
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000, }

moment.locale('zh-cn');
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
