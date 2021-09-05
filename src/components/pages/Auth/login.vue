<template>
  <div class="auth-login-page">
    <div class="container" v-for="item in mainText" :key="item.id">
      <div class="logo-auth">
        <router-link to="/"
          ><img src="../../../assets/images/logos/logo.png" alt=""
        /></router-link>
      </div>
      <div class="text-info-auth">
        <h3>{{ item.login.title }}</h3>
        <p>{{ item.login.mainTitle }}</p>
      </div>
      <div class="form-auth-login">
        <div class="form-group">
          <input
            type="email"
            name="email"
            class="form-control"
            id="email"
            placeholder=" "
            v-model="data.userName"
            v-on:keydown.enter.prevent="loginBTN"
          />
          <label for="email">
            {{ item.login.form.usernamePlaceholder }}
            <small>*</small>
          </label>
        </div>
        <div class="form-group">
          <input
            type="password"
            name="password"
            id="password"
            class="form-control"
            placeholder=" "
            v-model="data.password"
            v-on:keydown.enter.prevent="loginBTN"
          />
          <label for="password">
            {{ item.login.form.passwordPlaceholder }}
            <small>*</small>
          </label>
        </div>
        <div class="forgot-password">
          <router-link tag="a" :to="{ name: 'ForgetPassword_1' }">{{
            item.login.forgotPassword
          }}</router-link>
        </div>
        <div class="all-main-btn main-btn text-center mt-5">
          <button type="button" v-if="waiting">
            <span> <i class="fas fa-spinner"></i> </span>
          </button>
          <button @click="loginBTN" type="button cc" v-else>
            {{ item.login.form.button }}
          </button>
        </div>
      </div>
      <div class="register-auth-url">
        <h6>
          {{ item.login.dontHaveAccount }}
          <router-link tag="a" to="/register">{{
            item.login.joinNow
          }}</router-link>
        </h6>
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

      data: {
        userName: "",
        password: "",
      },
      mainText: [],
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
    validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    loginBTN() {
      this.waiting = true;

      if (this.data.userName == "") {
        setTimeout(() => {
          this.$iziToast.error({
            message: (this.error.static.text = "برجاء إدخال إسم المستخدم"),
            position: "bottomRight",
            rtl: true,
          });
          this.waiting = false;
        });
      } else if (this.data.password == "") {
        setTimeout(() => {
          this.$iziToast.error({
            message: (this.error.static.text = "برجاء إدخال كلمة المرور"),
            position: "bottomRight",
            rtl: true,
          });
          this.waiting = false;
        });
      } else {
        this.waiting = true;
        const loginFormData = new FormData();
        loginFormData.append("username", this.data.userName);
        loginFormData.append("password", this.data.password);
        loginFormData.append("type", "web");

        axios
          .post("login", loginFormData, {
            headers: {
              "Accept-language": this.lang,
              "cache-control": "no-cache",
              "Content-type": "multipart/form-data",
              Accept: "application/json",
            },
          })
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("efba-token", res.data.data.token);
            localStorage.setItem("efba-userImage", res.data.data.image);
            localStorage.setItem("userId", res.data.data.id);
            localStorage.setItem("username", this.data.userName);
            this.$iziToast.success({
              title: "success",
              message: (this.error.static.text = "تم تسجيل الدخول بنجاح"),
              position: "bottomRight",
              rtl: true,
            });
            this.$router.push({ name: "main-home" });
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
