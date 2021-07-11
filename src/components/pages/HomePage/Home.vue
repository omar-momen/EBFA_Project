<template>
  <div class="home">
    <SiteHeader></SiteHeader>
    <transition name="slither" mode="out-in">
      <router-view :key="$route.path"></router-view>
    </transition>
    <SiteFooter></SiteFooter>
  </div>
</template>
<script>
import SiteHeader from "../Global/siteHeader.vue";
import SiteFooter from "../Global/siteFooter.vue";
export default {
  created() {
    var body = document.querySelector("body");
    var lang = localStorage.getItem("epfa_lang");
    if (lang == "en") {
      body.classList.add("ltr");
    } else {
      body.classList.remove("ltr");
    }
    if (!lang) {
      localStorage.setItem("epfa_lang", "ar");
    }
  },
  components: {
    SiteHeader,
    SiteFooter,
  },
  methods: {},
};
</script>
