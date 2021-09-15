<template>
  <div class="membersSection">
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
          {{ item.sectionsTitles.members.redTitle }}
          <span>{{ item.sectionsTitles.members.title }}</span>
        </h4>
      </div>

      <div
        class="members-slider"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <div class="row" v-if="members">
          <VueSlickCarousel v-bind="memberSlider">
            <div
              class="single-member col-4"
              v-for="member in members"
              :key="member.id"
            >
              <router-link :to="'/member/' + member.id">
                <div class="img-member">
                  <img :src="member.media" alt="" />
                </div>
                <div class="text-member">
                  <h5>
                    {{ item.members.title }} / <span>{{ member.name }}</span>
                  </h5>
                  <h6>{{ member.position }}</h6>
                </div>
              </router-link>
            </div>
          </VueSlickCarousel>
        </div>
      </div>

      <div class="all-main-btn main-btn text-center mt-5 mb-5">
        <router-link to="/management" tag="a">{{
          item.members.show_All
        }}</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.single-member {
  height: 300px;
  a {
    display: block;
    height: 100%;
    .img-member {
      height: 100%;
      img {
        transition: all 0.2s linear;
        height: 100%;
        object-fit: cover;
      }
    }
    .text-member {
    }
  }

  &:hover {
    a {
      .img-member {
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

      members: null,
      mainText: [],
      memberSlider: {
        dots: true,
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        touchThreshold: 5,
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
        this.members = res.data.homeMembers;
      });
  },
};
</script>
