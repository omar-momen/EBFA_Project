<template>
  <div class="newEntrants mt-5">
    <div class="container" v-for="item in mainText" :key="item.id">
      <!-- News -->
      <div
        class="title-sections title-light"
        data-aos="zoom-in"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <h4>
          {{ item.sectionsTitles.entry.redTitle }}
          <span>{{ item.sectionsTitles.entry.title }}</span>
        </h4>
      </div>
      <div
        v-if="newentrants"
        class="entrants-slider"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <div class="row">
          <VueSlickCarousel v-bind="enterSlider">
            <div
              class="single-entrants"
              v-for="newentrant in newentrants"
              :key="newentrant.id"
            >
              <router-link :to="'profile/' + newentrant.id">
                <div class="img-entrants">
                  <img
                    @error="replaceByDefault"
                    :src="newentrant.avatar"
                    alt=""
                  />
                </div>
                <div class="text-entrants">
                  <h5>{{ newentrant.agent_name }}</h5>
                  <h6>{{ newentrant.club }}</h6>
                </div>
              </router-link>
            </div>
          </VueSlickCarousel>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.single-entrants {
  height: 21rem;

  a {
    display: block;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .img-entrants {
      img {
        height: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .text-entrants {
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

import imgFalse from "../../../assets/images/auth/bg-left.png";

export default {
  data() {
    return {
      lang: localStorage.getItem("epfa_lang"),
      newentrants: null,

      mainText: [],
      enterSlider: {
        infinite: true,
        slidesToShow: 4,
        speed: 500,
        rows: 2,
        slidesPerRow: 1,
        dots: true,
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
  methods: {
    replaceByDefault(e) {
      e.target.src = imgFalse;
    },
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
        this.newentrants = res.data.players;
      });
  },
};
</script>
