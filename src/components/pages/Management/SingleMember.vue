<template>
  <div class="newsPage">
    <!-- Start  Breadcrumb -->
    <div class="breadcrumb">
      <div class="container" v-for="item in mainText" :key="item.id">
        <h1>{{ item.members.singleMember.breadcrumbTitle }}</h1>
        <p>{{ item.members.singleMember.breadcrumbContent }}</p>
      </div>
    </div>
    <!-- End  Breadcrumb -->
    <div class="container">
      <div
        class="content-new-single"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <div class="col-6" v-if="member">
          <div class="single-member single-member-page">
            <div class="img-member">
              <img @error="replaceByDefault" :src="member.media" alt="" />
            </div>
            <div class="text-member">
              <h5>{{ member.name }}</h5>
              <h6>{{ member.position }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.single-member .img-member img {
  width: 100%;
  height: 20rem;
  border-radius: 5rem;
}
.content-new-single {
  display: flex;
  justify-content: center;
}
.text-member {
  margin: 2rem 0;
  text-align: center;
}
.text-member h5 {
  color: var(--aw-red);
  font-weight: bold;
}
</style>

<script>
import imgFalse from "../../../assets/images/auth/bg-left.png";
import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";

import axios from "axios";
export default {
  data() {
    return {
      lang: localStorage.getItem("epfa_lang"),
      mainText: [],
      id: "",
      member: null,
    };
  },
  methods: {
    replaceByDefault(e) {
      e.target.src = imgFalse;
    },
  },
  mounted() {
    if (this.lang == "ar") {
      this.mainText = textAr.data;
    } else {
      this.mainText = textEn.data;
    }
  },
  created() {
    this.id = this.$route.params.id;

    axios
      .get(`${this.id}/member`, {
        headers: {
          "Accept-language": this.lang,
          "cache-control": "no-cache",
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        this.member = res.data.data;
      });
  },
};
</script>

<style scoped>
</style>

