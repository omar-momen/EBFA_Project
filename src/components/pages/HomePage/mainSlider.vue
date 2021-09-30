<template>
  <div class="rootParent">
    <LoaderOne v-if="loading" />
    <div v-else class="mainSlider">
      <vue-slick-carousel
        ref="slider1"
        v-bind="slider1Setting"
        @beforeChange="onBeforeChangeSlider2"
      >
        <div class="single-slider" v-for="slide in sliderData" :key="slide.id">
          <img :src="slide.media" />
          <div class="container">
            <div class="slider-content">
              <div class="container">
                <h3>{{ slide.title }}</h3>
                <p v-html="slide.description"></p>
                <div class="main-btn">
                  <router-link :to="'/news/' + slide.id">{{
                    mainText[0].slider.title
                  }}</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vue-slick-carousel>
      <div
        class="container"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="900"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <div class="slider-main-bg">
          <vue-slick-carousel
            ref="slider2"
            v-bind="slider2Setting"
            @beforeChange="onBeforeChangeSlider1"
            :slidesToShow="3"
          >
            <div
              class="single-dot"
              v-for="(slide, index) in sliderData"
              :key="slide.id"
            >
              <div
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  dot_inside
                "
              >
                <div class="count">0{{ index + 1 }}</div>
                <div class="content-dot">
                  <p>
                    <read-more
                      more-str=""
                      :text="slide.description"
                      less-str=""
                      :max-chars="50"
                    ></read-more>
                  </p>
                  <ul class="d-flex justify-content-right">
                    <li>
                      <i class="fa fa-calendar"></i>
                      {{ slide.created_at | moment("dddd, MMMM Do YYYY") }}
                    </li>
                    <li>
                      <i class="fa fa-clock"></i>
                      {{ slide.created_at | moment("h:mm a") }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </vue-slick-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.slick-current {
  z-index: 10;
}

.single-slider {
  img {
    height: 100%;
    object-fit: cover;
  }
  .container {
    color: #fff;
    max-width: 70%;

    @media (max-width: 992px) {
      max-width: 80%;
    }
  }
}

.slider-main-bg {
  .slick-list {
    display: flex;
    .slick-track {
      display: flex;
      align-items: stretch;

      .slick-slide {
        height: 100%;

        & > div {
          height: 100%;
          .single-dot {
            height: 100%;

            cursor: pointer;
            transition: all 0.2s linear;
            height: 100%;

            .dot_inside {
              height: 100%;
              .content-dot {
                height: 100%;
              }
            }
            &:hover {
              background: #ff000073;
            }
          }
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
  name: "MyComponent",
  data() {
    return {
      loading: false,

      lang: localStorage.getItem("epfa_lang"),
      mainText: [],

      sliderData: "",

      slider1Setting: {
        arrows: false,
        dots: false,
        asNavFor: this.$refs.slider2,
        focusOnSelect: true,
        fade: true,
      },
      slider2Setting: {
        arrows: false,
        dots: false,
        asNavFor: this.$refs.slider1,
        focusOnSelect: true,
        slidesToShow: 3,
        draggable: false,
      },
    };
  },
  methods: {
    onBeforeChangeSlider1(currentPosition, nextPosition) {
      this.$refs.slider1.goTo(nextPosition);
    },
    onBeforeChangeSlider2(currentPosition, nextPosition) {
      this.$refs.slider2.goTo(nextPosition);
    },
  },
  components: { VueSlickCarousel },
  mounted() {
    if (this.lang == "ar") {
      this.mainText = textAr.data;
    } else {
      this.mainText = textEn.data;
    }
  },
  created() {
    this.loading = true;
    axios
      .get("home", {
        headers: {
          "cache-control": "no-cache",
          "Content-type": "application/json",
          Accept: "application/json",
          "Accept-Language": this.lang,
          // lang: "ar",
        },
        params: {
          type: "image",
        },
      })
      .then((res) => {
        this.sliderData = res.data.slider;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  },
};
</script>
