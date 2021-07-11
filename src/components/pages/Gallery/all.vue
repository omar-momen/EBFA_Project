<template>
  <div class="galleryPage">
    <LoaderOne v-if="loading" />
    <div v-else class="d" v-for="item in mainText" :key="item.id">
      <!-- Start  Breadcrumb -->
      <div class="breadcrumb">
        <div class="container">
          <h1>{{ item.media.breadcrumbTitle }}</h1>
          <p>{{ item.media.breadcrumbContent }}</p>
        </div>
      </div>
      <!-- End  Breadcrumb -->
      <div class="gallerySection">
        <div class="container">
          <!-- News -->
          <div class="title-sections">
            <h4>
              {{ item.media.mainTitle.one }}
              <span>{{ item.media.mainTitle.tow }}</span>
            </h4>
          </div>
          <!-- Gallery Section -->
          <div class="gallery_videos">
            <div>
              <b-tabs content-class="mt-3">
                <b-tab :title="item.media.imageTitle" active>
                  <div class="row">
                    <div
                      class="col-md-3"
                      v-for="image in images"
                      :key="image.id"
                    >
                      <div
                        class="single-gallery"
                        @click="toggleFancyImage(image)"
                      >
                        <div class="img-gallery">
                          <img :src="image.files.image[0]" alt="" />
                        </div>
                        <div class="text-gallery">
                          <h4>{{ image.title }}</h4>
                          <ul class="d-flex justify-content-right">
                            <li>
                              <i class="fa fa-calendar"></i>
                              {{
                                image.created_at | moment("dddd, MMMM Do YYYY")
                              }}
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
                <b-tab :title="item.media.videoTitle">
                  <div class="row">
                    <div
                      class="col-md-3"
                      v-for="video in videos"
                      :key="video.id"
                    >
                      <div
                        class="single-gallery"
                        @click="toggleFancyVideo(video)"
                      >
                        <div class="img-gallery">
                          <img :src="video.files.vedios[0].preview" alt="" />
                        </div>
                        <div class="text-gallery">
                          <h4>{{ video.title }}</h4>
                          <ul class="d-flex justify-content-right">
                            <li>
                              <i class="fa fa-calendar"></i>
                              {{
                                video.created_at | moment("dddd, MMMM Do YYYY")
                              }}
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
                </b-tab>

                <div class="pagenation" v-if="last_page > 1">
                  <ul>
                    <li
                      v-for="index in last_page"
                      :class="index === currentPage ? 'active' : ''"
                      :key="index"
                      @click="indexNumber(index)"
                    >
                      {{ index }}
                    </li>
                  </ul>
                </div>
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
        </div>
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
  name: "allGallery",
  data() {
    return {
      loading: false,
      lang: localStorage.getItem("epfa_lang"),

      media: null,
      images: [],
      videos: [],
      mainText: null,

      // pagenation
      last_page: "",
      currentPage: 1,

      showFancyImage: false,
      fancyImageSrc: "",

      showFancyVideo: false,
      fancyVideoSrc: "",
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
    // pagenation
    indexNumber(pageNumber) {
      document.getElementById("app").scrollIntoView({ behavior: "smooth" });

      if (this.currentPage !== pageNumber) {
        this.currentPage = pageNumber;
        this.getData();
      }
    },

    toggleFancyImage(image) {
      this.showFancyImage = !this.showFancyImage;
      this.fancyImageSrc = image.files.image[0];
    },

    toggleFancyVideo(video) {
      this.showFancyVideo = !this.showFancyVideo;
      this.fancyVideoSrc = video.files.vedios[0].source;
    },

    getData() {
      this.loading = true;
      axios
        .get(`media?page=${this.currentPage}`, {
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
          this.loading = false;
          this.media = res.data.data;

          this.last_page = res.data.meta.last_page;
          this.currentPage = res.data.meta.current_page;

          this.images = this.media.filter((item) => {
            return item.type === "image";
          });
          this.videos = this.media.filter((item) => {
            return item.type === "video";
          });
        });
    },
  },
  components: {},
  created() {
    this.getData();
  },
};
</script>
