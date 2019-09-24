import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store";
import http from "./http";
import moment from "dayjs";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./mock";
import VCharts from "v-charts";
import clipboard from "clipboard";
// import QRCode from "qrcode"
import VueI18n from "vue-i18n";
import Print from "./plugs/print";
import VueResource from "vue-resource";

Vue.use(VueResource);
Vue.use(Print);
Vue.use(VCharts);
Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.prototype.$axios = http;
Vue.prototype.$moment = moment;
Vue.prototype.$clipboard = clipboard;
// Vue.prototype.$qrcode = QRCode;
Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: "zh", // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    zh: require("./common/lang/zh"), // 中文语言包
    en: require("./common/lang/en"), // 英文语言包
    fan: require("./common/lang/fan") //繁體语言包
  }
});

// 处理响应超时时间
axios.defaults.timeout = 10000;

// 设置post请求的响应头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

// 设置请求拦截
// axios.interceptors.request.use(
//   config => {
//     const token = localStorage.token;
//     token && (config.headers.Authorization = token);
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );
// 设置响应拦截
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
