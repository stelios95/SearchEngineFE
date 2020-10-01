import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueAxios from "vue-axios";
import axios from "axios";

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
