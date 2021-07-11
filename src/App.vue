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
  components: {
  },
};
</script>
