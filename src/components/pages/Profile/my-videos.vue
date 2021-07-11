<template>
  <div class="genralInfo mt-5 mb-5">
    <div class="dd" v-for="jsonItem in mainText" :key="jsonItem.id">
      <div class="row">
        <div class="col-md-4" v-for="(video, index) in myVidoes" :key="index">
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
            <div class="btn-remove">
              <button @click.stop="remmoveVideo(video.id)" type="button">
                <i class="fas fa-times"></i>
              </button>
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

      <transition name="fade">
        <div
          @click="uploderActive = !uploderActive"
          class="uplode_video"
          v-if="uploderActive"
        >
          <form @click.stop>
            <h3>{{ jsonItem.profile.videos.addVideo }}</h3>
            <div class="form-group">
              <input
                :placeholder="jsonItem.profile.videos.videoTitle"
                class="form-control"
                type="text"
                v-model="user.videoTitle"
              />
            </div>
            <div class="file-upload-wrapper form-control">
              <span> <i class="fas fa-upload"></i> </span>
              <input
                id="formFile_uplodeFile"
                type="file"
                accept="video/*"
                multiple
                class="form-control"
                v-on:keydown.enter.prevent="update"
                @change="uploadVideo_2"
              />
            </div>

            <div class="all-main-btn">
              <button v-if="waiting" type="button">
                <span><i class="fas fa-spinner"></i></span>
              </button>
              <button v-else @click="addVideo" type="button">
                <span> {{ jsonItem.profile.videos.addVideo }} </span>
              </button>
            </div>
          </form>
        </div>
      </transition>

      <button
        @click="uploderActive = !uploderActive"
        class="uplode_button"
        type="button"
      >
        {{ jsonItem.profile.videos.uploadVideo }}
      </button>
    </div>
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

.uplode_video {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #333333e3;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    width: 60%;
    padding: 2rem;
    background-color: #fff;
    border-radius: 2rem;
    text-align: center;

    h3 {
      font-size: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #33333338;
    }

    .form-group {
      margin: 1rem 0;

      input {
        margin-top: 1.5rem;
        padding: 1.4rem 1rem;
        border-radius: 1rem;
      }
    }

    .file-upload-wrapper {
      position: relative;
      padding: 2.2rem 1rem;
      border-radius: 2rem;

      span {
        display: block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 1.5rem;
        color: red;
        z-index: 1;
        font-size: 1.5rem;
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 1.4rem 1rem;
        border-radius: 1rem;
        z-index: 2;
        opacity: 0;
      }
    }

    button {
      background-color: var(--aw-red);
      color: #fff;
      z-index: 1;
      cursor: pointer;
      text-align: center;
      border-top-left-radius: 25px;
      border-bottom-right-radius: 25px;
      border-bottom-left-radius: 25px;
      color: var(--aw-light);
      line-height: 45px;
      display: block;
      padding: 0 15px;
      width: -webkit-max-content;
      width: -moz-max-content;
      width: max-content;
      font-weight: bold;
      margin-top: 20px;
      border: none;
      margin: 1.5rem auto 0.5rem;
    }
  }
}

.uplode_button {
  margin: 1rem auto;
  background-color: var(--aw-red);
  color: var(--aw-light);
  cursor: pointer;
  text-align: center;
  border-radius: 25px 0 25px 25px;
  line-height: 45px;
  display: block;
  padding: 0 15px;
  width: max-content;
  font-weight: bold;
  margin-top: 20px;
  border: none;
}
</style>


<script>
import imgFalse from "../../../assets/images/gallery/gal1.png";
import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";

import axios from "axios";

export default {
  data() {
    return {
      showFancyVideo: false,
      fancyVideoSrc: "",

      uploderActive: false,
      myVidoes: null,
      mainText: [],
      lang: localStorage.getItem("epfa_lang"),
      playerDate: null,
      id: "",
      myVideos: null,
      waiting: false,
      user: {
        videosSrc: [],
        videosSrc_2: null,
        videoTitle: "",
      },
      error: {
        static: {
          error: false,
          text: "",
        },
      },
    };
  },

  methods: {
    // upload video

    uploadVideo_2(e) {
      this.user.videosSrc_2 = e.target.files[0];
    },

    addVideo() {
      if (this.user.videosSrc_2 == null) {
        setTimeout(() => {
          if (this.lang == "ar") {
            this.$iziToast.error({
              message: (this.error.static.text = "يرجي إضافة فيديو"),
              position: "bottomRight",
              rtl: true,
            });
          }
          if (this.lang == "en") {
            this.$iziToast.error({
              message: (this.error.static.text = "please add video"),
              position: "bottomRight",
              rtl: true,
            });
          }
        }, 1000);
      } else if (this.user.videoTitle == "") {
        setTimeout(() => {
          if (this.lang == "ar") {
            this.$iziToast.error({
              message: (this.error.static.text = "يرجي إضافة عنوان"),
              position: "bottomRight",
              rtl: true,
            });
          }
          if (this.lang == "en") {
            this.$iziToast.error({
              message: (this.error.static.text = "please add title"),
              position: "bottomRight",
              rtl: true,
            });
          }
        }, 1000);
      } else {
        this.waiting = true;

        let data = new FormData();
        data.append("name", this.user.videoTitle);
        data.append("videos[]", this.user.videosSrc_2);

        axios
          .post("player/upload/video", data, {
            headers: {
              Authorization: "bearer" + localStorage.getItem("efba-token"),
              "Accept-language": this.lang,
              "cache-control": "no-cache",
              "Content-type": "multipart/form-data",
              Accept: "application/json",
            },
          })
          .then(() => {
            this.waiting = false;
            this.uploderActive = false;
            this.$iziToast.success({
              message: (this.error.static.text = "تمت العملية بنجاح"),
              position: "bottomRight",
              rtl: true,
            });
            this.getVideos();
          })
          .catch((err) => {
            this.waiting = false;
            this.$iziToast.error({
              messagse: (this.error.static.text =
                err.response.data.errors.username[0]),
              position: "bottomRight",
              rtl: true,
            });
          });
      }
    },

    remmoveVideo(id) {
      axios
        .get(`player/delete/video/${id}`, {
          headers: {
            Accept: "application/json",
            "Accept-language": this.lang,
            Authorization: "bearer" + localStorage.getItem("efba-token"),
          },
        })
        .then(() => {
          this.getVideos();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getVideos() {
      axios
        .get("profile", {
          headers: {
            Accept: "application/json",
            "Accept-language": this.lang,
            Authorization: "bearer" + localStorage.getItem("efba-token"),
          },
        })
        .then((res) => {
          this.myVidoes = res.data.data.videos;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    replaceByDefault(e) {
      e.target.src = imgFalse;
    },

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

  created() {
    this.getVideos();
  },
};
</script>

