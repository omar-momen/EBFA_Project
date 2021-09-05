import Vue from "vue";
import App from "./App.vue";

// ======== Bootsrtap
import "bootstrap/dist/css/bootstrap.min.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// ======== Font AweSome
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

// ======== ReSource
import VueResource from "vue-resource";

// ======== iziToast
import iziToast from "izitoast";

// ======== Axios
import axios from "axios";

// ======== Custom Style
import "./assets/css/iziToast.min.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";

// ======== Router File
import router from "./components/router/index";

Vue.config.productionTip = false;
import "./assets/css/iziToast.min.css";
// map
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDRymdCLWxCwLHFnwv36iieKAMjiwk8sdc",
    libraries: "places",
  },
});
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
Vue.use(iziToast);
Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.prototype.$iziToast = iziToast;

const moment = require("moment");
if (localStorage.getItem("epfa_lang") == "ar") {
  require("moment/locale/ar");
}
Vue.use(require("vue-moment"), {
  moment,
});
// moment.locale("es");

import ReadMore from "vue-read-more";
Vue.use(ReadMore);

// baseurl
axios.defaults.baseURL = "http://epfaegypt.com/epfa/public/api/";

// Glopal Components
import LoaderOne from "./components/pages/loader/sliderLoader.vue";
import LoaderTow from "./components/pages/loader/siteLoader.vue";
import LoaderThree from "./components/pages/loader/headerLoaer.vue";

Vue.component("LoaderOne", LoaderOne);
Vue.component("LoaderTow", LoaderTow);
Vue.component("LoaderThree", LoaderThree);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
