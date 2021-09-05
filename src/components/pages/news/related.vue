<template>
  <div class="relatedContainer">
    <div class="newsSection" v-for="item in mainText" :key="item.id">
      <div class="container">
        <!-- News -->
        <div class="title-sections">
          <h4>
            {{ item.news.related.mainTitle.one }}
            <span>{{ item.news.related.mainTitle.tow }}</span>
          </h4>
        </div>
        <!-- News Section -->
        <div class="row">
          <!-- Single -->
          <div
            v-for="New in relateNews"
            :key="New.id"
            class="col-md-4"
            data-aos="zoom-in"
            data-aos-delay="200"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
          >
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.single-new {
  height: 25rem;
  margin: 2rem 0;
  a {
    height: 100%;
    display: block;

    .text-new p {
      font-size: 2rem;
    }

    .img-new {
      height: 100%;
      img {
        height: 100%;
        object-fit: cover;
        border-radius: 2rem;
      }
    }
  }
}
</style>

<script>
import axios from "axios";
import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";
import imgFalse from "../../../assets/images/news/new1.png";

export default {
  name: "related",
  data() {
    return {
      lang: localStorage.getItem("epfa_lang"),

      relateNews: null,
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
    replaceByDefault(e) {
      e.target.src = imgFalse;
    },
  },
  created() {
    axios
      .get("related/news", {
        headers: {
          "Accept-language": this.lang,
          "cache-control": "no-cache",
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        this.relateNews = res.data.data;
      });
  },
};
</script>
