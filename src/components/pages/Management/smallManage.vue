<template>
  <div class="Small-managementSection">
    <div class="dd" v-for="item in mainText" :key="item.id">
      <!-- Small Management Section -->
      <div
        class="title-sections mt-5"
        data-aos="zoom-in"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <h4>
          {{ item.members.membersHeader.one }}
          <span>{{ item.members.membersHeader.tow }}</span>
        </h4>
      </div>
      <div
        class="members-slider small-members mt-5"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <div class="container">
          <div class="row">
            <!-- single -->
            <div class="col-md-3" v-for="member in members" :key="member.id">
              <router-link :to="'member/' + member.id">
                <div class="single-member single-member-page">
                  <div class="img-member">
                    <img :src="member.media" alt="" />
                  </div>
                  <div class="text-member">
                    <h5>{{ member.name }}</h5>
                    <h6>{{ member.position }}</h6>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-member img {
  height: 17rem;
  object-fit: cover;
}
</style>

<script>
import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";
export default {
  name: "management",
  props: ["members"],
  data() {
    return {
      lang: localStorage.getItem("epfa_lang"),
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
};
</script>
