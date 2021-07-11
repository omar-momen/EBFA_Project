<template>
  <div class="gallerySection">
    <div class="container" v-for="item in mainText" :key="item.id">
      <!-- News -->
      <div
        class="title-sections"
        data-aos="zoom-in"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <h4>
          {{ item.sectionsTitles.media.redTitle }}
          <span>{{ item.sectionsTitles.media.title }}</span>
        </h4>
      </div>
      <!-- Gallery Section -->
      <div class="gallery_videos" v-for="item in mainText" :key="item.id">
        <div>
          <b-tabs content-class="mt-3">
            <b-tab :title="item.Gallary.images" active>
              <div class="row">
                <div class="col-md-3" v-for="image in images" :key="image.id">
                  <div class="single-gallery" @click="toggleFancyImage(image)">
                    <div class="img-gallery">
                      <img :src="image.files.image[0]" alt="" />
                    </div>
                    <div class="text-gallery">
                      <h4>{{ image.title }}</h4>
                      <ul class="d-flex justify-content-right">
                        <li>
                          <i class="fa fa-calendar"></i>
                          {{ image.created_at | moment("dddd, MMMM Do YYYY") }}
                        </li>
                        <li>
                          <i class="fa fa-clock"></i>
                          {{ image.created_at | moment("h:mm a") }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </b-tab>

            <b-tab :title="item.Gallary.videos">
              <div class="row">
                <div class="col-md-3" v-for="video in videos" :key="video.id">
                  <div class="single-gallery" @click="toggleFancyVideo(video)">
                    <div class="img-gallery">
                      <img :src="video.files.vedios[0].preview" alt="" />
                    </div>
                    <div class="text-gallery">
                      <h4>{{ video.title }}</h4>
                      <ul class="d-flex justify-content-right">
                        <li>
                          <i class="fa fa-calendar"></i>
                          {{ video.created_at }}
                        </li>
                        <li>
                          <i class="fa fa-clock"></i>
                          {{ video.created_at }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </b-tab>
          </b-tabs>

          <transition name="fade">
            <div class="fancyBox-Custom" v-if="showFancyImage">
              <a @click="showFancyImage = false"
                ><i class="fas fa-times"></i
              ></a>
              <img :src="fancyImageSrc" alt="" />
            </div>
          </transition>

          <transition name="fade">
            <div class="fancyBox-Custom" v-if="showFancyVideo">
              <a @click="showFancyVideo = false"
                ><i class="fas fa-times"></i
              ></a>
              <video controls>
                <source :src="fancyVideoSrc" />
              </video>
            </div>
          </transition>
        </div>
      </div>

      <div class="all-main-btn main-btn text-center mt-3 mb-3">
        <router-link to="/media" tag="a">{{
          item.sectionsTitles.media.button
        }}</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.single-gallery {
  height: 19rem;

  .img-gallery {
    img {
      transition: all 0.2s linear;
      object-fit: cover;
      height: 100%;
    }
  }

  .text-gallery {
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
  img,
  video {
    max-height: 80%;
    max-width: 80%;
    margin: auto;
  }
}
</style>


<script>
import axios from "axios";
import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";
export default {
  name: "gallery",
  data() {
    return {
      lang: localStorage.getItem("epfa_lang"),
      media: null,
      images: [],
      videos: [],

      showFancyImage: false,
      fancyImageSrc: "",

      showFancyVideo: false,
      fancyVideoSrc: "",

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
  methods: {
    toggleFancyImage(image) {
      this.showFancyImage = !this.showFancyImage;
      this.fancyImageSrc = image.files.image[0];
    },

    toggleFancyVideo(video) {
      this.showFancyVideo = !this.showFancyVideo;
      this.fancyVideoSrc = video.files.vedios[0].source;
    },
  },
  created() {
    axios
      .get("media", {
        headers: {
          "Accept-language": this.lang,
          "cache-control": "no-cache",
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
        params: {
          type: "image",
        },
      })
      .then((res) => {
        this.media = res.data.data;

        this.images = this.media.filter((item) => {
          return item.files.image.length > 0;
        });
        this.videos = this.media.filter((item) => {
          return item.files.vedios.length > 0;
        });
      });
  },
};
</script>
