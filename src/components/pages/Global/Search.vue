<template>
  <div class="newEntrants search mt-5">
    <div class="container" v-for="item in mainText" :key="item.id">
      <!-- News -->
      <div v-if="!notFound">
        <div
          class="title-sections title-light"
          data-aos="zoom-in"
          data-aos-delay="200"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <h4 class="search_title">
            {{ item.sectionsTitles.entry.redTitle }}
            <span>{{ item.sectionsTitles.entry.title }}</span>
          </h4>
        </div>
        <div
          class="entrants-slider"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <div class="row">
            <div
              class="col-lg-3"
              v-for="item_search in textValue"
              :key="item_search.id"
            >
              <div class="single-entrants">
                <router-link :to="'/profile/' + item_search.id">
                  <div class="img-entrants">
                    <img
                      @error="replaceByDefault"
                      :src="item_search.avatar"
                      alt=""
                    />
                  </div>
                  <div class="text-entrants">
                    <h5>{{ item_search.agent_name }}</h5>
                    <h6>{{ item_search.club }}</h6>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 class="notFound" v-else>No Results Found</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search_title {
  span {
    color: #333 !important;
  }
}

.notFound {
  width: 90%;
  text-align: center;
  margin: 0 auto;
  color: #333;
}
.single-entrants .img-entrants img {
  height: 100%;
  height: 100%;
  object-fit: cover;
}
.newEntrants.search {
  background: #fff;
}

.single-entrants {
  margin: 1rem 0;
}
</style>

<script>
import axios from "axios";

import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";

import imgFalse from "../../../assets/images/auth/bg-left.png";

export default {
  data() {
    return {
      notFound: false,
      lang: localStorage.getItem("epfa_lang"),
      newentrants: null,
      text: "",
      textValue: null,
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
    this.text = this.$route.params.text;
    axios
      .get(`player/search/for?query=${this.text}`, {
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
        this.textValue = res.data.data;
        if (this.textValue.length == 0) {
          this.notFound = true;
        }
      });
  },
};
</script>
