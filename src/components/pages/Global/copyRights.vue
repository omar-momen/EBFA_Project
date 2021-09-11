<template>
  <div class="copyRights">
    <div class="container" v-for="item in mainText" :key="item.id">
      <div class="row">
        <div class="col-md-6">
          <div class="text-right-copy">
            <p>© FIFPro World Players' Union 2021 - Legals</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="text-left-copy d-flex footerLogo">
            <a href="https://alalmiyalhura.com/" target="_blank">
              <img
                src="../../../assets/images/logos/alalmiya.png"
                alt="Alalmiy Alhura Logo"
              />
            </a>
            <span class="footerSpan">Developed by alalmiya alhura</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  @media (max-width: 992px) {
    max-width: 100%;
  }
}
</style>

<script>
import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";
export default {
  name: "CopyRights",
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
