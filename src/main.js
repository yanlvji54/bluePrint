import Vue from 'vue';
import App from './App';
import WXrequest from './utils/wxRequest';
import store from './store';

Vue.prototype.$store = store;
Vue.prototype.$httpWX = WXrequest;
Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();
