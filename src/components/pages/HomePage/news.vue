<template>
  <div class="newsSection">
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
          {{ item.sectionsTitles.news.redTitle }}
          <span>{{ item.sectionsTitles.news.title }}</span>
        </h4>
      </div>
      <!-- News Section -->
      <div
        class="row"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <div class="col-lg-8">
          <div class="row">
            <div class="col-md-6" v-for="New in news_1" :key="New.id">
              <div class="single-new">
                <router-link :to="'/news/' + New.id" tag="a">
                  <div class="img-new">
                    <img @error="replaceByDefault" :src="New.media" alt="" />
                  </div>
                  <div class="text-new">
                    <h4>
                      {{ New.title }}
                    </h4>
                    <ul class="d-flex justify-content-right">
                      <li>
                        <i class="fa fa-calendar"></i>
                        {{ New.created_at | moment("dddd, MMMM Do YYYY") }}
                      </li>
                      <li>
                        <i class="fa fa-clock"></i>
                        {{ New.created_at | moment("h:mm a") }}
                      </li>
                    </ul>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="row">
            <div class="col-md-12" v-for="New in news_2" :key="New.id">
              <div class="single-new-small">
                <router-link :to="'/news/' + New.id" tag="a">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="img-new">
                        <img
                          @error="replaceByDefault"
                          :src="New.media"
                          alt=""
                        />
                      </div>
                    </div>
                    <div class="col-md-8">
                      <div class="text-new">
                        <h4>
                          {{ New.title }}
                        </h4>
                        <ul class="d-flex justify-content-right">
                          <li>
                            <i class="fa fa-calendar"></i>
                            {{ New.created_at | moment("dddd, MMMM Do YYYY") }}
                          </li>
                          <li>
                            <i class="fa fa-clock"></i>
                            {{ New.created_at | moment("h:mm a") }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="all-main-btn main-btn text-center mt-5 mb-5">
        <router-link to="/news" tag="a">{{
          item.sectionsTitles.news.button
        }}</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.single-new-small {
  height: unset;
  img {
    object-fit: cover;
  }
}
.single-new {
  height: 300px;
  a {
    display: block;
    height: 100%;
    .img-new {
      height: 100%;
      img {
        transition: all 0.2s linear;
        object-fit: cover;
        height: 100%;
      }
    }
    .text-new {
      width: 100%;
    }
  }
  &:hover {
    a {
      .img-new {
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

import imgFalse from "../../../assets/images/news/new2.png";

import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";

export default {
  name: "NewsSection",
  data() {
    return {
      lang: localStorage.getItem("epfa_lang"),
      mainText: [],
      news: null,
      news_1: null,
      news_2: null,
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
        this.news = res.data.home_news;

        this.news_1 = this.news.slice(0, 2);
        this.news_2 = this.news.slice(2, 5);
      });
  },
};
</script>
