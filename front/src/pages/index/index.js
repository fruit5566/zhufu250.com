import Vue from 'vue';
import App from './index.vue';
import toast from '@/components/plugin/toast';

Vue.use(toast);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');