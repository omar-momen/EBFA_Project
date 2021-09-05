<template>
  <div class="siteFooter">
    <div class="container" v-for="item in mainText" :key="item.id">
      <div class="row">
        <div
          class="col-lg-4 col-md-6"
          data-aos="fade-left"
          data-aos-delay="100"
          data-aos-duration="700"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <div class="right-part">
            <img src="../../../assets/images/logos/logo.png" alt="" />
            <p>{{ item.siteFooter.info.mainTitle }}</p>
            <ul class="contact-info contact-info-footer" v-if="contact">
              <li>
                <a href="#">
                  <i class="fas fa-map-marker-alt"></i>
                  {{ contact.address }}
                </a>
              </li>
              <li>
                <a :href="'tel:' + contact.phone">
                  <i class="fas fa-phone-alt"></i>
                  {{ contact.phone }}
                </a>
              </li>
              <li>
                <a :href="'//api.whatsapp.com/send?phone=+' + contact.phone">
                  <i class="fab fa-whatsapp"></i> {{ contact.phone }}
                </a>
              </li>
              <li>
                <a :href="'mailto:' + contact.email">
                  <i class="fas fa-envelope"></i>
                  {{ contact.email }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="col-lg-2 col-md-6"
          data-aos="fade-left"
          data-aos-delay="200"
          data-aos-duration="900"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <div class="important-links">
            <h3 class="title-footer">{{ item.siteFooter.titeEPFA }}</h3>
            <ul class="footer_links">
              <li>
                <router-link tag="a" to="/">
                  {{ item.siteHeader.home }}
                </router-link>
              </li>
              <li>
                <router-link tag="a" to="/management">
                  {{ item.siteHeader.managers }}
                </router-link>
              </li>
              <li>
                <router-link tag="a" to="/about">
                  {{ item.siteHeader.about }}
                </router-link>
              </li>
              <li>
                <router-link tag="a" to="/news">
                  {{ item.siteHeader.news }}
                </router-link>
              </li>
              <li>
                <router-link tag="a" to="/contact">
                  {{ item.siteHeader.contact }}
                </router-link>
              </li>
              <li>
                <router-link tag="a" to="/login">
                  {{ item.siteHeader.login }}
                </router-link>
              </li>
              <li>
                <router-link tag="a" to="/register">
                  {{ item.siteHeader.register }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="col-lg-4 col-md-6 last_news"
          data-aos="fade-left"
          data-aos-delay="300"
          data-aos-duration="1100"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <div class="news-footer" v-if="news">
            <h3 class="title-footer">{{ item.siteFooter.lestsnews }}</h3>
            <div class="single-new-small" v-for="New in news" :key="New.id">
              <router-link :to="'/news/' + New.id" tag="a">
                <div class="row">
                  <div class="col-md-4">
                    <div class="img-new">
                      <img @error="replaceByDefault" :src="New.media" alt="" />
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="text-new">
                      <h4>
                        <read-more
                          more-str=""
                          :text="New.description"
                          less-str=""
                          :max-chars="50"
                        ></read-more>
                      </h4>
                      <ul class="d-flex justify-content-right">
                        <li>
                          <i class="fa fa-calendar"></i>
                          {{ New.created_at }}
                        </li>
                        <li>
                          <i class="fa fa-clock"></i>
                          {{ New.created_at }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div
          class="col-lg-2 col-md-6"
          data-aos="fade-left"
          data-aos-delay="400"
          data-aos-duration="1300"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <div class="important-links">
            <h3 class="title-footer">{{ item.siteFooter.guilds }}</h3>
            <ul>
              <li class="guild" v-for="guild in guilds" :key="guild.id">
                {{ guild.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- CopyRight -->
    <copyRights></copyRights>
  </div>
</template>

<style lang="scss" scoped>
@media (max-width: 500px) {
  .row > div {
    margin: 1rem 0;
  }
  .last_news {
    display: none;
  }
  ul.footer_links {
    display: flex;
    flex-wrap: wrap;

    li {
      width: 50%;
    }
  }
}

.siteFooter {
  position: relative;
  z-index: 3;
}
.guild {
  color: #fff;
}
</style>

<script>
import axios from "axios";

import imgFalse from "../../../assets/images/auth/bg-left.png";

import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";

import copyRights from "@/components/pages/Global/copyRights";
export default {
  name: "siteFooter",
  data() {
    return {
      lang: localStorage.getItem("epfa_lang"),
      contact: null,
      guilds: null,
      news: null,
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
  components: {
    copyRights,
  },
  methods: {
    replaceByDefault(e) {
      e.target.src = imgFalse;
    },
  },
  created() {
    axios
      .get("contact", {
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
        this.contact = res.data.data;
      });

    axios
      .get("home/guilds", {
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
        this.guilds = res.data.data;
      });

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
        this.news = res.data.homeFooterNews;
      });
  },
};
</script>
