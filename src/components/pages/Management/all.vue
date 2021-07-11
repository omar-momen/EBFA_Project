<template>
  <div class="managementPage">
    <div class="dd" v-for="item in mainText" :key="item.id">
      <!-- Start  Breadcrumb -->
      <div class="breadcrumb">
        <div class="container">
          <h1>{{ item.members.breadcrumbTitle }}</h1>
          <p>{{ item.members.breadcrumbContent }}</p>
        </div>
      </div>
      <!-- End  Breadcrumb -->
      <!-- Management Section -->
      <managers :management="management"></managers>
      <!-- Management Section -->
      <small-manage :members="members"></small-manage>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";

import smallManage from "./smallManage.vue";
import managers from "./managers.vue";
export default {
  name: "management",
  components: {
    smallManage,
    managers,
  },
  data() {
    return {
      lang: localStorage.getItem("epfa_lang"),
      mainText: [],
      members: null,
      management: null,
    };
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
      .get("members", {
        headers: {
          "Accept-language": this.lang,
          "cache-control": "no-cache",
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        this.members = res.data.members;
        this.management = res.data.management;
      });
  },
};
</script>
