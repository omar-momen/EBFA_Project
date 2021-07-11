<template>
  <div class="home">
    <!-- Slider -->
    <mainSlider ></mainSlider>
    <news></news>
    <members></members>
    <new-entrants></new-entrants>
    <gallery></gallery>
    <most-followed></most-followed>
  </div>
</template>
<script>
import mainSlider from "./mainSlider.vue";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import News from "./news.vue";
import Members from "./members.vue";
import NewEntrants from "./newEntrants.vue";
import gallery from "./gallery.vue";
import MostFollowed from './mostFollowed.vue';
export default {
  components: {
    mainSlider,
    News,
    Members,
    NewEntrants,
    gallery,
    MostFollowed,
  },
};
</script>
