import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import ElementUI from 'element-ui';
import alert from './myPlugins/alert'
import confirm from './myPlugins/confirm'
import msg from './myPlugins/message'

import 'element-ui/lib/theme-chalk/index.css';
import '../public/css/public.less'

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(alert);
Vue.use(confirm);
Vue.use(msg);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
