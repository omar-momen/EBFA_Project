<template>
  <div class="rootParent">
    <LoaderThree v-if="loading" />
    <div v-else class="AboutPage">
      <div class="d" v-for="item in mainText" :key="item.id">
        <!-- Start  Breadcrumb -->
        <div class="breadcrumb">
          <div class="container">
            <h1>{{ item.about.title }}</h1>
            <p>{{ item.about.descreption }}</p>
          </div>
        </div>
        <!-- End  Breadcrumb -->
        <!-- Start Content About Us -->
        <div class="container">
          <div class="row">
            <div
              class="col-md-6"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-once="true"
            >
              <div class="title-sections text-end">
                <h4>
                  {{ item.about.subtitle_one.first }}
                  <span>{{ item.about.subtitle_one.second }}</span>
                </h4>
              </div>
              <div class="text-about" v-if="aboutText">
                <p v-html="aboutText"></p>
              </div>
            </div>
            <div
              class="col-md-6"
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-once="true"
            >
              <div class="images-about">
                <img src="../../../assets/images/about/about1.png" />
                <img src="../../../assets/images/about/about2.png" />
              </div>
            </div>
          </div>
        </div>
        <!-- End Content About Us -->
        <!-- Start Slider -->

        <div class="container mt-100">
          <div
            class="title-sections"
            data-aos="zoom-in"
            data-aos-delay="200"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
          >
            <h4>
              {{ item.about.subtitle_second.first }}
              <span>{{ item.about.subtitle_second.second }}</span>
            </h4>
          </div>
          <div
            class="about-slider-tabs"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
          >
            <b-tabs v-model="tabIndex" end v-if="years">
              <b-tab
                @click="changeYear(year.year)"
                :title="year.year"
                v-for="year in years"
                :key="year.id"
              >
                <VueSlickCarousel v-bind="aboutSlider" v-if="singleYear">
                  <div
                    class="single-about-img"
                    v-for="item in singleYear"
                    :key="item.id"
                  >
                    <img class="about_image" :src="item.files.image" alt="" />
                  </div>
                </VueSlickCarousel>
              </b-tab>
            </b-tabs>
            <!-- Control buttons-->

            <div class="">
              <button @click="tabIndex--" class="btn-arrow-awady prev">
                <i class="fas fa-angle-right"></i>
              </button>
              <button @click="tabIndex++" class="btn-arrow-awady next">
                <i class="fas fa-angle-left"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- End Slider -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.about_image {
  border-radius: 1rem;
  margin: 1rem;
}
</style>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";

import axios from "axios";
export default {
  name: "AboutUs",
  data() {
    return {
      loading: false,
      lang: localStorage.getItem("epfa_lang"),
      mainText: [],
      years: null,
      singleYear: null,
      aboutText: "",

      aboutSlider: {
        centerMode: true,
        centerPadding: "20px",
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 4,
        speed: 500,
        arrows: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              arrows: false,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
              arrows: false,
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
      tabIndex: 1,
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
    changeYear(year) {
      axios
        .get(`media/history?year=${year}`, {
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
          this.singleYear = res.data.data;
        });
    },
  },
  components: { VueSlickCarousel },
  created() {
    this.loading = true;
    axios
      .get("media/years", {
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
        this.years = res.data.data;
        this.changeYear(this.years[1].year);
        this.loading = false;
      });

    axios
      .get("about", {
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
        this.aboutText = res.data.data.about;
      });
  },
};
</script>
