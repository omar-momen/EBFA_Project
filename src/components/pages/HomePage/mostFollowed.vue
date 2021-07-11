<template>
  <div class="mostFollowed">
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
          {{ item.sectionsTitles.followers.redTitle }}
          <span>{{ item.sectionsTitles.followers.title }}</span>
        </h4>
      </div>

      <div
        class="follow-slider"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <div class="row">
          <VueSlickCarousel v-bind="mostFollowedSlider" v-if="players">
            <div
              class="single-follow"
              v-for="player in players"
              :key="player.id"
            >
              <router-link :to="'profile/' + player.id" tag="a">
                <div class="img-follow">
                  <img :src="player.avatar" alt="" />
                </div>
                <div class="text-follow">
                  <h5>{{ player.agent_name }}</h5>
                  <h6>{{ player.club }}</h6>
                </div>
              </router-link>
            </div>

            <template #prevArrow>
              <button type="button" class="prevArrow arrowAwaDy">
                <i class="fa fa-angle-left"></i>
              </button>
            </template>
            <template #nextArrow>
              <button type="button" class="nextArrow arrowAwaDy">
                <i class="fa fa-angle-right"></i>
              </button>
            </template>
          </VueSlickCarousel>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.single-follow {
  height: 300px;
  a {
    display: block;
    height: 100%;
    .img-follow {
      height: 100%;
      img {
        transition: all 0.2s linear;
        height: 100%;
        object-fit: cover;
        border-radius: 5rem;
      }
    }
    .text-follow {
    }
  }

  &:hover {
    a {
      .img-follow {
        img {
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>

<script>
import axios from "axios";

import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";

import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  data() {
    return {
      lang: localStorage.getItem("epfa_lang"),
      players: null,
      mainText: [],
      mostFollowedSlider: {
        dots: true,
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 4,
        touchThreshold: 5,
        arrows: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
              arrows: false,
            },
          },
        ],
      },
    };
  },
  components: {
    VueSlickCarousel,
  },
  mounted() {
    if (this.lang == "ar") {
      this.mainText = textAr.data;
    } else {
      this.mainText = textEn.data;
    }
  },
  created() {
    axios
      .get("home", {
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
        this.players = res.data.MostFollowedPlayers;
      });
  },
};
</script>
