<template>
  <section>
    <base-card>
      <h2>Page not found</h2>
      <p>
        This page could not be found - go To home
        <router-link to="/">Home</router-link>.
      </p>
    </base-card>
  </section>
</template>

<script>
import BaseCard from "./Global/BaseCard.vue";
export default {
  components: {
    BaseCard,
  },
};
</script>