<template>
  <div class="genralInfo">
    <div class="dd" v-for="jsonItem in mainText" :key="jsonItem.id">
      <div
        class="form-auth-login mb-5 mt-5"
        v-for="item in mainText"
        :key="item.id"
      >
        <div class="form-step1 fadeIn">
          <div class="row">
            <div class="upload-block uplaod-user avatar text-center">
              <div class="upload_wrap">
                <img
                  :src="data.avatar_imageSrc"
                  class="uploading-image"
                  alt=" "
                  v-if="data.avatar_imageSrc != null"
                />
                <img
                  src="../../../assets/images/avatar/ava.png"
                  class="uploading-image"
                  alt=" "
                  v-else
                />

                <input
                  type="file"
                  style="right: 0"
                  accept="image/*"
                  @change="avatar_uploadImage"
                  v-on:keydown.enter.prevent="registerBTN"
                />
              </div>
              <!-- <p>{{ item.register.form.presonalPic }}</p> -->
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <input
                  type="text"
                  name="fullname"
                  class="form-control"
                  id="fullname"
                  placeholder=" "
                  v-model="data.userName"
                />
                <label for="username">
                  {{ item.profile.infoForm.name }}
                  <small>*</small>
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <input
                  type="text"
                  name="phone"
                  class="form-control"
                  id="phone"
                  placeholder=" "
                  v-model="data.phone"
                />
                <label for="phone">
                  {{ item.profile.infoForm.phone }}
                  <small>*</small>
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <input
                  type="date"
                  name="date"
                  class="form-control"
                  v-model="data.date"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <input
                  type="text"
                  name="placeOfBirth"
                  class="form-control"
                  id="placeOfBirth"
                  placeholder=" "
                  v-model="data.placeOfBirth"
                />
                <label for="placeOfBirth">
                  {{ item.profile.infoForm.placeOfBirth }}
                  <small>*</small>
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <input
                  type="text"
                  name="nationality"
                  class="form-control"
                  id="nationality"
                  placeholder=" "
                  v-model="data.nationality"
                />
                <label for="placeOfBirth">
                  {{ item.profile.infoForm.nationality }}
                  <small>*</small>
                </label>
              </div>
            </div>
            <div class="col-md-6 editPasswordButtonParent">
              <button
                @click="password.passwordActive = !password.passwordActive"
              >
                {{ item.profile.infoForm.editPassword }}
              </button>
            </div>
            <transition name="fade">
              <div
                @click="password.passwordActive = !password.passwordActive"
                class="editPassword"
                v-if="password.passwordActive"
              >
                <div @click.stop class="passwords">
                  <div class="form-group">
                    <input
                      type="password"
                      name="password"
                      class="form-control"
                      placeholder=" "
                      v-model="password.oldPassword"
                    />
                    <label for="password">
                      {{ item.profile.infoForm.oldPassword }}
                      <small>*</small>
                    </label>
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      name="password"
                      class="form-control"
                      placeholder=" "
                      v-model="password.newPassowrd"
                    />
                    <label for="password">
                      {{ item.profile.infoForm.newPassword }}
                      <small>*</small>
                    </label>
                  </div>
                  <div class="all-main-btn main-btn text-center mt-5">
                    <button @click="updatePassword" type="button">
                      <!-- {{ item.login.form.button }} -->
                      {{ item.profile.infoForm.edit }}
                    </button>
                  </div>
                </div>
              </div>
            </transition>
            <div class="all-main-btn main-btn text-center mt-5">
              <button type="button" v-if="waiting">
                <span> <i class="fas fa-spinner"></i> </span>
              </button>
              <button @click="updateData" type="button cc" v-else>
                <!-- {{ item.login.form.button }} -->
                {{ item.profile.infoForm.edit }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.upload_wrap {
  margin-bottom: 2rem;
}
.editPassword {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #333333bf;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  .passwords {
    width: 70%;
    background: #fff;
    padding: 1rem;
    border-radius: 2rem;
  }
}
.editPasswordButtonParent {
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    border: none;
    background: #333;
    outline: none;
    color: #fff;
    padding: 1rem;
    border-radius: 1rem;
  }
}
</style>

<script>
import axios from "axios";
import imgFalse from "../../../assets/images/news/new1.png";
import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";

export default {
  data() {
    return {
      mainText: [],
      lang: localStorage.getItem("epfa_lang"),
      id: "",
      waiting: false,

      data: {
        avatar_image: null,
        avatar_imageSrc: null,
        userName: "",
        phone: "",
        placeOfBirth: "",
        date: "",
        nationality: "",
        playerDate: null,
      },

      password: {
        passwordActive: false,
        oldPassword: "",
        newPassowrd: "",
      },

      error: {
        static: {
          error: false,
          text: "",
        },
      },
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
    avatar_uploadImage(event) {
      this.data.avatar_image = event.target.files[0];
      this.data.avatar_imageSrc = URL.createObjectURL(this.data.avatar_image);
    },

    updateData() {
      if (this.data.avatar_imageSrc == null) {
        setTimeout(() => {
          this.$iziToast.error({
            message: (this.error.static.text = "برجاء ادخال الصورة الشخصية"),
            position: "bottomRight",
            rtl: true,
          });
        });
      } else if (this.data.userName == "") {
        setTimeout(() => {
          this.$iziToast.error({
            title: "Error",
            message: (this.error.static.text = "برجاء إدخال إسم المستخدم"),
            position: "bottomRight",
            rtl: true,
          });
        });
      } else if (this.data.nationality == "") {
        setTimeout(() => {
          this.$iziToast.error({
            title: "Error",
            message: (this.error.static.text = "برجاء إدخال  الجنسية"),
            position: "bottomRight",
            rtl: true,
          });
        });
      } else if (this.data.date == "") {
        setTimeout(() => {
          this.$iziToast.error({
            message: (this.error.static.text = "برجاء إدخال تاريخ الميلاد"),
            position: "bottomRight",
            rtl: true,
          });
        });
      } else if (this.data.placeOfBirth == "") {
        setTimeout(() => {
          this.$iziToast.error({
            message: (this.error.static.text = "برجاء إدخال محل الميلاد"),
            position: "bottomRight",
            rtl: true,
          });
        });
      } else if (this.data.phone == "") {
        setTimeout(() => {
          this.$iziToast.error({
            message: (this.error.static.text = "برجاء إدخال رقم الهاتف"),
            position: "bottomRight",
            rtl: true,
          });
        });
      } else {
        this.waiting = true;

        const data = new FormData();
        if (this.data.avatar_image != null) {
          data.append("cover", this.data.avatar_image);
        }
        data.append("username", this.data.userName);
        data.append("date_of_birth", this.data.date);
        data.append("birth_location", this.data.placeOfBirth);
        data.append("phone", this.data.phone);
        data.append("nationality", this.data.nationality);

        axios
          .post("update/player/general_data", data, {
            headers: {
              Accept: "application/json",
              "Accept-language": this.lang,
              Authorization: "bearer" + localStorage.getItem("efba-token"),
            },
          })
          .then(() => {
            this.waiting = false;
            localStorage.setItem("efba-userImage", this.data.avatar_imageSrc);

            this.$iziToast.success({
              title: "success",
              message: (this.error.static.text = "تم تعديل الباينات بنجاح"),
              position: "bottomRight",
              rtl: true,
            });
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

    updatePassword() {
      if (this.password.oldPassword == "") {
        setTimeout(() => {
          this.$iziToast.error({
            message: (this.error.static.text =
              "برجاء ادخال كلمة المرور القديمة"),
            position: "bottomRight",
            rtl: true,
          });
        });
      } else if (this.password.newPassowrd == "") {
        setTimeout(() => {
          this.$iziToast.error({
            message: (this.error.static.text =
              "برجاء ادخال كلمة المرور الجديدة"),
            position: "bottomRight",
            rtl: true,
          });
        });
      } else {
        const data = new FormData();
        data.append("old_password", this.password.oldPassword);
        data.append("password", this.password.newPassowrd);

        axios
          .post("edit_password", data, {
            headers: {
              Accept: "application/json",
              "Accept-language": this.lang,
              Authorization: "bearer" + localStorage.getItem("efba-token"),
            },
          })
          .then(() => {
            localStorage.setItem("efba-userImage", this.data.avatar_imageSrc);

            this.$iziToast.success({
              title: "success",
              message: (this.error.static.text = "تم تعديل كلمة المرور بنجاح"),
              position: "bottomRight",
              rtl: true,
            });
            this.password.passwordActive = false;
          })
          .catch((err) => {
            this.$iziToast.error({
              message: (this.error.static.text = err.response.data.message),
              position: "bottomRight",
              rtl: true,
            });
          });
      }
    },

    replaceByDefault(e) {
      e.target.src = imgFalse;
    },
  },

  created() {
    axios
      .get("profile", {
        headers: {
          Accept: "application/json",
          "Accept-language": this.lang,
          Authorization: "bearer" + localStorage.getItem("efba-token"),
        },
      })
      .then((res) => {
        if (res.data.status === "success") {
          this.playerDate = res.data.data;

          this.data.avatar_imageSrc = this.playerDate.avatar;
          this.data.userName = this.playerDate.username;
          this.data.phone = this.playerDate.phone;
          this.data.date = this.playerDate.date_of_birth;
          this.data.placeOfBirth = this.playerDate.birth_location;
          this.data.nationality = this.playerDate.nationality;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

