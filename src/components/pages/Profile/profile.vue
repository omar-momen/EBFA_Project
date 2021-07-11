<template>
  <div class="profilePage">
    <div class="dd" v-for="jsonItem in mainText" :key="jsonItem.id">
      <!-- Start  Breadcrumb -->
      <div class="breadcrumb">
        <div class="container">
          <h1>{{ jsonItem.profile.breadcrumbTitle }}</h1>
          <p>{{ jsonItem.profile.breadcrumbContent }}</p>
        </div>
      </div>
      <!-- End  Breadcrumb -->
      <!-- Start Content profile -->
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="profile-tabs">
              <b-tabs content-class="mt-3">
                <b-tab :title="jsonItem.profile.tabs.generalInfo" active>
                  <genral-info></genral-info>
                </b-tab>
                <b-tab :title="jsonItem.profile.tabs.videos">
                  <my-videos></my-videos>
                </b-tab>
                <b-tab :title="jsonItem.profile.tabs.contactInfo"
                  ><contact-info></contact-info>
                </b-tab>
                <b-tab :title="jsonItem.profile.tabs.profInfo"
                  ><prof-info></prof-info
                ></b-tab>
              </b-tabs>
            </div>
          </div>
        </div>
      </div>
      <!-- End Content profile -->
    </div>
  </div>
</template>
<script>
import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";

import genralInfo from "./genral-info.vue";
import myVideos from "./my-videos.vue";
import contactInfo from "./contact-info.vue";
import profInfo from "./prof-info.vue";

export default {
  name: "Profile",
  data() {
    return {
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
  methods: {},
  components: {
    genralInfo,
    myVideos,
    contactInfo,
    profInfo,
  },
};
</script>
