<template>
  <div class="auth-login-page">
    <div class="container" v-for="item in mainText" :key="item.id">
      <div class="logo-auth">
        <router-link to="/"
          ><img src="../../../assets/images/logos/logo.png" alt=""
        /></router-link>
      </div>
      <div class="text-info-auth">
        <h3>{{ item.forgetPassword.title }}</h3>
        <p>{{ item.forgetPassword.mainTitle }}</p>
      </div>
      <div class="form-auth-login">
        <div class="form-group">
          <input
            type="text"
            name="phone"
            class="form-control"
            id="phone"
            placeholder=" "
            v-model="data.phone"
            v-on:keydown.enter.prevent="send_code"
          />
          <label for="phone">
            {{ item.forgetPassword.form.phone }}
            <small>*</small>
          </label>
        </div>
        <div class="all-main-btn main-btn text-center mt-5">
          <button type="button" v-if="waiting">
            <span> <i class="fas fa-spinner"></i> </span>
          </button>
          <button @click="send_code" type="button cc" v-else>
            {{ item.forgetPassword.send }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";
export default {
  name: "login",
  data() {
    return {
      lang: localStorage.getItem("epfa_lang"),
      mainText: [],

      data: {
        phone: "",
      },

      waiting: false,
      error: {
        static: {
          error: false,
          text: "",
        },
      },
    };
  },
  methods: {
    send_code() {
      if (this.data.phone == "") {
        setTimeout(() => {
          this.$iziToast.error({
            message: (this.error.static.text = "برجاء إدخال رقم الهاتف"),
            position: "bottomRight",
            rtl: true,
          });
          this.waiting = false;
        });
      } else {
        this.waiting = true;
        const data = new FormData();
        data.append("phone", this.data.phone);

        axios
          .post("send_code", data, {
            headers: {
              "Accept-language": this.lang,
              "cache-control": "no-cache",
              "Content-type": "multipart/form-data",
              Accept: "application/json",
            },
          })
          .then(() => {
            this.waiting = true;
            this.$iziToast.success({
              title: "success",
              message: (this.error.static.text = "تم ارسال الكود بنجاح"),
              position: "bottomRight",
              rtl: true,
            });
            this.$router.push({ name: "ForgetPassword_2" });
          })
          .catch((err) => {
            this.waiting = false;
            this.$iziToast.error({
              message: (this.error.static.text = err.response.data.message),
              position: "bottomRight",
              rtl: true,
            });
          });
      }
    },
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
