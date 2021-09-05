<template>
  <div class="managementSection">
    <div class="dd" v-for="item in mainText" :key="item.id">
      <div
        class="title-sections"
        data-aos="zoom-in"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <h4>
          {{ item.members.managerHeader.one }}
          <span>{{ item.members.managerHeader.tow }}</span>
        </h4>
      </div>
      <div
        class="members-slider mt-5"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <div class="container">
          <div class="row">
            <!-- single -->
            <div
              class="col-md-4"
              v-for="manager in management"
              :key="manager.id"
            >
              <router-link :to="'member/' + manager.id">
                <div class="single-member single-member-page">
                  <div class="img-member">
                    <img :src="manager.media" alt="" />
                  </div>
                  <div class="text-member">
                    <h5>{{ manager.name }}</h5>
                    <h6>{{ manager.position }}</h6>
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
.container .row .col-md-4:first-child {
  order: 1;
}
.container .row .col-md-4:nth-child(2) {
  order: 3;
}
.container .row .col-md-4:last-child {
  order: 2;
}

.img-member {
  height: unset !important;
}
.img-member img {
  height: 17rem;
  object-fit: cover;
}
</style>

<script>
import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";
export default {
  name: "managers",
  props: ["management"],
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
};
</script>
