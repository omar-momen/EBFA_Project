<template>
  <div class="single-profile" v-if="player">
    <div class="breadcrumb">
      <div class="container">
        <h1>{{ player.username }}</h1>
      </div>
    </div>
    <!-- End  Breadcrumb -->
    <div class="container mt-5 mb-5" v-for="item in mainText" :key="item.id">
      <div class="row">
        <div class="col-md-3">
          <div
            class="player-image"
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
          >
            <img :src="player.avatar" alt="" />
          </div>
        </div>
        <div class="col-md-9">
          <div
            class="player-text"
            data-aos="fade-right"
            data-aos-delay="200"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
          >
            <ul>
              <li>
                <span>{{ item.profile.single_player.name }} </span>
                <small>:</small>{{ player.username }}
              </li>
              <li>
                <span>{{ item.profile.single_player.placeOfBirth }}</span>
                <small>:</small>
                {{ player.birth_location }}
              </li>
              <li>
                <span>{{ item.profile.single_player.age }}</span>
                <small>:</small>{{ player.age }}
              </li>
              <li>
                <span>{{ item.profile.single_player.section }}</span>
                <small>:</small>{{ player.position }}
              </li>
              <li>
                <span>{{ item.profile.single_player.currentClub }}</span>
                <small>:</small>{{ player.club }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <videos :myVideos="myVideos"></videos>
  </div>
</template>

<style scoped>
.player-image {
  padding: 0;
}
</style>

<script>
import axios from "axios";
import textAr from "../../../../json/mainText/text-ar.json";
import textEn from "../../../../json/mainText/text-en.json";

import videos from "./videos.vue";
export default {
  name: "singlePlayer",
  components: {
    videos,
  },
  data() {
    return {
      lang: localStorage.getItem("epfa_lang"),

      id: "",
      player: null,
      myVideos: null,
      mainText: [],
    };
  },
  mounted() {
    if (this.lang == "ar") {
      this.mainText = textAr.data;
    } else {
      this.mainText = textEn.data;
    }
  },
  created() {
    this.id = this.$route.params.id;

    axios
      .get(`player/${this.id}`, {
        headers: {
          "Accept-language": this.lang,
          "cache-control": "no-cache",
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        this.player = res.data.data;
        this.myVideos = this.player.videos;
        console.log(this.player);
      });
  },
};
</script>
