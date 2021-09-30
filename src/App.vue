<template>
  <div id="app">
    <transition name="slither" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  name: "App",

  metaInfo() {
    return {
      title: this.title,
    };
  },

  data() {
    return {
      title: "",
    };
  },

  mounted() {
    localStorage.getItem("epfa_lang") == "ar"
      ? (this.title = "EPFA - الجمعية المصرية للاعبي كرة القدم المحترفين")
      : (this.title = "EPFA - Egyptian Professional Footballers Association");
  },
};
</script>
