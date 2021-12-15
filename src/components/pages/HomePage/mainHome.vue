<template>
  <div class="home">
    <!-- Slider -->
    <mainSlider></mainSlider>

    <!-- Vote Banner -->
    <div class="container">
      <router-link to="/newVote">
        <div
          class="player"
          :style="{ backgroundImage: `url(${playerBackground})` }"
        >
          <img src="@/assets/images/homeVote.png" />
          <div class="info">
            <h2>مين أفضل لاعب في الشهر ؟</h2>
            <h3>تقدر دلوقتي تصوت لأفضل لاعب في الشهر</h3>
          </div>
        </div>
      </router-link>
    </div>

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
import MostFollowed from "./mostFollowed.vue";
export default {
  components: {
    mainSlider,
    News,
    Members,
    NewEntrants,
    gallery,
    MostFollowed,
  },

  data() {
    return {
      playerBackground: require("@/assets/images/entrants/player_bg.png"),
    };
  },
};
</script>

<style lang="scss" scoped>
.player {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 15px;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 50px auto;
  color: #fff;
  text-align: center;
  width: fit-content;
  cursor: pointer;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;

    & > * {
      margin: 10px 0;
    }
  }

  img {
    object-fit: cover;
    margin-inline-end: 10px;
    height: 160px;
  }

  .info {
    // h2 {
    //   color: #fff;
    //   font-size: 20px;
    // }
    // h3 {
    //   color: #fff;
    //   font-size: 20px;
    // }
  }
}
</style>
