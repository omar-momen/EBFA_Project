<template>
  <div class="newsPage">
    <div class="dd" v-for="item in mainText" :key="item.id">
      <!-- Start  Breadcrumb -->
      <div class="breadcrumb">
        <div class="container">
          <h1>{{ item.news.breadcrumbTitle }}</h1>
          <p>{{ item.news.breadcrumbContent }}</p>
        </div>
      </div>
      <!-- End  Breadcrumb -->
      <div class="newsSection">
        <div class="container">
          <!-- News -->
          <div class="title-sections">
            <h4>
              {{ item.news.mainTitle.one }}
              <span>{{ item.news.mainTitle.tow }}</span>
            </h4>
          </div>
          <!-- News Section -->
          <div class="row">
            <!-- Single -->
            <div
              v-for="New in news"
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

          <div class="pagenation" v-if="last_page > 1">
            <ul>
              <li
                v-for="index in last_page"
                :class="index === currentPage ? 'active' : ''"
                :key="index"
                @click="indexNumber(index)"
              >
                {{ index }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
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
  name: "allNews",
  components: {},
  data() {
    return {
      // pagenation
      last_page: "",
      currentPage: 1,

      news: null,
      mainText: null,
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
    // pagenation
    indexNumber(pageNumber) {
      document.getElementById("app").scrollIntoView({ behavior: "smooth" });

      if (this.currentPage !== pageNumber) {
        this.currentPage = pageNumber;
        this.getData();
      }
    },

    getData() {
      axios
        .get(`news?page=${this.currentPage}`, {
          headers: {
            "Accept-language": this.lang,
            "cache-control": "no-cache",
            "Content-type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((res) => {
          this.news = res.data.data;

          this.last_page = res.data.meta.last_page;
          this.currentPage = res.data.meta.current_page;
        });
    },

    replaceByDefault(e) {
      e.target.src = imgFalse;
    },
  },
  created() {
    this.getData();
  },
};
</script>
