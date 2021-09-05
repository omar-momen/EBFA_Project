<template>
  <div class="newsPage">
    <div class="dd" v-for="item in mainText" :key="item.id">
      <!-- Start  Breadcrumb -->
      <div class="breadcrumb">
        <div class="container">
          <h1>{{ item.news.singleNew.breadcrumbTitle }}</h1>
          <p>{{ item.news.singleNew.breadcrumbContent }}</p>
        </div>
      </div>
      <!-- End  Breadcrumb -->
      <div class="container" v-if="singleNew">
        <div
          class="content-new-single"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <div class="title-new">
            <h3>
              {{ singleNew.title }}
            </h3>
          </div>
          <div class="date-new">
            <ul class="d-flex justify-content-right">
              <li>
                <i class="fa fa-calendar"></i>
                {{ singleNew.created_at | moment("dddd, MMMM Do YYYY") }}
              </li>
              <li>
                <i class="fa fa-clock"></i>
                {{ singleNew.created_at | moment("h:mm a") }}
              </li>
            </ul>
          </div>
          <div class="img-new">
            <img @error="replaceByDefault" :src="singleNew.media" alt="" />
          </div>
          <div class="text-new">
            <p>{{ singleNew.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <related></related>
  </div>
</template>

<style scoped>
.text-new p {
  font-size: 2rem;
}
.img-new img {
  height: 40rem;
  object-fit: cover;
  border-radius: 2rem;
}
</style>

<script>
import related from "@/components/pages/news/related";
import axios from "axios";
import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";
import imgFalse from "../../../assets/images/news/new2.png";
export default {
  name: "allNews",
  components: {
    related,
  },
  data() {
    return {
      id: "",
      singleNew: null,
      mainText: [],
      lang: localStorage.getItem("epfa_lang"),
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
    this.id = this.$route.params.id;
    axios
      .get(`${this.id}/news`, {
        headers: {
          "Accept-language": this.lang,
          "cache-control": "no-cache",
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        this.singleNew = res.data.data;
      });
  },
};
</script>
