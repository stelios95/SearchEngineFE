import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import VueRouter from "vue-router";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueAxios from "vue-axios";
import axios from "axios";

import HomePage from "./components/HomePage.vue";
import ResultPage from "./components/ResultPage.vue";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/search/:searchConfigs",
    name: "search",
    component: ResultPage,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

new Vue(Vue.util.extend({ router }, App)).$mount("#app");
