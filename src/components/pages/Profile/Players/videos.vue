<template>
  <div class="genralInfo mt-5 mb-5">
    <div class="container" v-for="item in mainText" :key="item.id">
      <div
        class="title-sections"
        data-aos="zoom-in"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <h4>
          {{ item.profile.single_player.videos.one }}
          <span>{{ item.profile.single_player.videos.tow }}</span>
        </h4>
      </div>
      <div class="row">
        <div class="col-md-4" v-for="(video, index) in myVideos" :key="index">
          <div @click="toggleFancyVideo(video)" class="single-video">
            <div class="image-video">
              <span><i class="far fa-play-circle"></i></span>
            </div>
            <div class="text-video">
              <h4>{{ video.title }}</h4>
              <ul class="d-flex justify-content-right">
                <li>
                  <i class="fa fa-calendar"></i>
                  {{ video.created_at | moment("dddd, MMMM Do YYYY") }}
                </li>
                <li>
                  <i class="fa fa-clock"></i>
                  {{ video.created_at | moment("h:mm a") }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div
        class="fancyBox-Custom"
        @click="showFancyVideo = false"
        v-if="showFancyVideo"
      >
        <a @click="showFancyVideo = false"><i class="fas fa-times"></i></a>
        <video @click.stop controls>
          <source :src="fancyVideoSrc" />
        </video>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.single-video {
  height: 19rem;
  margin: 2rem 1rem;
  height: 20rem;
  cursor: pointer;
  &:hover {
    .image-video {
      background: rgba(51, 51, 51, 0.5);
    }
  }

  .image-video {
    height: 100%;
    background: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s linear;

    span {
      margin: -2rem;
      display: block;
      background: #fff;
      border-radius: 50%;
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 4rem;
    }
  }

  .text-video {
    box-shadow: inset 0 -85px 20px -10px rgba(0, 0, 0, 0.7);
  }

  &:hover {
    .img-gallery {
      img {
        transform: scale(1.2);
      }
    }
  }
}

.fancyBox-Custom {
  video {
    height: 80%;
    width: 80%;
    margin: auto;
  }
}
</style>

<script>
import textAr from "../../../../json/mainText/text-ar.json";
import textEn from "../../../../json/mainText/text-en.json";
export default {
  name: "gallery",
  props: ["myVideos"],
  data() {
    return {
      showFancyVideo: false,
      fancyVideoSrc: "",

      mainText: [],
    };
  },
  methods: {
    toggleFancyVideo(video) {
      this.showFancyVideo = !this.showFancyVideo;
      this.fancyVideoSrc = video.video;
    },
  },
  mounted() {
    if (this.lang == "ar") {
      this.mainText = textAr.data;
    } else {
      this.mainText = textEn.data;
    }
  },
};
</script>
