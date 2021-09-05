<template>
  <div class="auth-login-page registerPage">
    <div class="container" v-for="item in mainText" :key="item.id">
      {{ country_id }}
      <div class="logo-auth d-flex align-items-center">
        <router-link to="/"
          ><img src="../../../assets/images/logos/logo.png" alt=""
        /></router-link>
        <div class="text-info-auth">
          <h3>{{ item.register.title }}</h3>
          <p>{{ item.register.mainTitle }}</p>
        </div>
      </div>
      <div class="steps-auth">
        <ul>
          <li class="active">
            <span>1</span>
            <p>{{ item.register.genralData }}</p>
          </li>
          <li :class="{ active: step == 2 || step == 3 }">
            <span>2</span>
            <p>{{ item.register.contactData }}</p>
          </li>
          <li :class="{ active: step == 3 }">
            <span>3</span>
            <p>{{ item.register.professionalData }}</p>
          </li>
        </ul>
      </div>
      <div class="form-auth-login mb-5">
        <transition name="slide-fade" mode="out-in">
          <div class="form-step1" v-if="step == 1">
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
              <p>{{ item.register.form.presonalPic }}</p>
            </div>
            <div class="form-group">
              <input
                type="text"
                name="email"
                class="form-control"
                id="username"
                placeholder=" "
                v-model="data.userName"
              />
              <label for="username">
                {{ item.register.form.email }}
                <small>*</small>
              </label>
            </div>
            <div class="form-group">
              <input
                type="date"
                name="date"
                class="form-control"
                v-model="data.date"
              />
              <label for="username">
                {{ item.register.form.dateOfBirth }}
                <small>*</small>
              </label>
            </div>
            <div class="form-group">
              <input
                type="text"
                name="placeOfBirth"
                class="form-control"
                v-model="data.placeOfBirth"
                id="placeOfBirth"
                placeholder=" "
              />
              <label for="placeOfBirth">
                {{ item.register.form.placeOfBirth }}
                <small>*</small>
              </label>
            </div>
            <div class="form-group">
              <input
                type="text"
                id="nationality"
                name="nationality"
                class="form-control"
                v-model="data.nationality"
                placeholder=" "
              />
              <label for="nationality">
                {{ item.register.form.nationality }}
                <small>*</small>
              </label>
            </div>
            <div class="form-group">
              <input
                type="password"
                name="password"
                v-model="data.password"
                class="form-control"
                placeholder=" "
              />
              <label for="password">
                {{ item.register.form.password }}
                <small>*</small>
              </label>
            </div>
          </div>
        </transition>

        <!-- Step 2 -->
        <transition name="slide-fade" mode="out-in">
          <div class="form-step1" v-if="step == 2">
            <div class="form-group">
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                class="form-control"
                placeholder=" "
                v-model="data.postalCode"
              />
              <label for="postalCode">
                {{ item.register.form.postalCode }}
                <small>*</small>
              </label>
            </div>
            <div class="form-group">
              <input
                type="text"
                name="address"
                id="address"
                class="form-control"
                placeholder=" "
                v-model="data.address"
              />
              <label for="address">
                {{ item.register.form.address }}
                <small>*</small>
              </label>
            </div>
            <div v-if="countries" class="form-group custom-select">
              <select v-model="country_id" @change="getCities()">
                <option disabled value v-if="lang == 'ar'">إختر الدولة</option>
                <option disabled value v-if="lang == 'en'">
                  choose country
                </option>
                <option
                  v-for="country in countries"
                  :key="country.id"
                  :value="country.id"
                >
                  {{ country.name }}
                </option>
              </select>
            </div>
            <div
              v-if="cities"
              class="form-group custom-select"
              :class="{ disabled: disabledCities }"
            >
              <select v-model="data.city_id">
                <option disabled value="" v-if="lang == 'ar'">
                  إختر المدينة
                </option>
                <option disabled value="" v-if="lang == 'en'">
                  choose City
                </option>
                <option v-for="city in cities" :key="city.id" :value="city.id">
                  {{ city.name }}
                </option>
              </select>
            </div>
            <div v-if="positions" class="form-group custom-select">
              <select v-model="data.position_id">
                <option disabled value="" v-if="lang == 'ar'">
                  إختر الموقع
                </option>
                <option disabled value="" v-if="lang == 'en'">
                  choose position
                </option>
                <option
                  v-for="position in positions"
                  :key="position.id"
                  :value="position.id"
                >
                  {{ position.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <input
                type="tel"
                name="phone"
                id="phone"
                class="form-control"
                placeholder=" "
                v-model="data.phone"
              />
              <label for="phone">
                {{ item.register.form.phone }}
                <small>*</small>
              </label>
            </div>
            <div class="form-group">
              <input
                type="tel"
                name="mobile"
                id="mobile"
                class="form-control"
                placeholder=" "
                v-model="data.mobile"
              />
              <label for="mobile">
                {{ item.register.form.mobile }}
                <small>*</small>
              </label>
            </div>
          </div>
        </transition>

        <!-- Step 3 -->
        <transition name="slide-fade" mode="out-in">
          <div class="form-step1" v-if="step == 3">
            <div v-if="clubs" class="form-group custom-select">
              <select v-model="data.club_id">
                <option disabled value="" v-if="lang == 'ar'">
                  إختر النادي
                </option>
                <option disabled value="" v-if="lang == 'en'">
                  choose club
                </option>
                <option v-for="club in clubs" :key="club.id" :value="club.id">
                  {{ club.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <input
                type="text"
                name="category"
                class="form-control"
                id="category"
                placeholder=" "
                v-model="data.category"
              />
              <label for="category">
                {{ item.register.form.category }}
                <small>*</small>
              </label>
            </div>
            <div class="form-group">
              <input
                type="date"
                name="date"
                class="form-control"
                v-model="data.endDate"
              />
              <label for="category">
                {{ item.register.form.endDate }}
                <small>*</small>
              </label>
            </div>
            <div class="form-group">
              <input
                type="text"
                name="agentName"
                class="form-control"
                v-model="data.agentName"
                id="agentName"
                placeholder=" "
              />
              <label for="agentName">
                {{ item.register.form.agentName }}
              </label>
            </div>
            <div class="form-group">
              <input
                type="text"
                id="fatherAddress"
                name="fatherAddress"
                class="form-control"
                v-model="data.fatherAddress"
                placeholder=" "
              />
              <label for="fatherAddress">
                {{ item.register.form.fatherAddress }}
              </label>
            </div>
            <div class="form-group">
              <input
                type="text"
                id="fatherPostalCode"
                name="fatherPostalCode"
                class="form-control"
                v-model="data.fatherPostalCode"
                placeholder=" "
              />
              <label for="fatherPostalCode">
                {{ item.register.form.fatherPostalCode }}
              </label>
            </div>
            <div v-if="countries" class="form-group custom-select">
              <select v-model="country_id" @change="getCities()">
                <option disabled value="" v-if="lang == 'ar'">
                  إختر الدولة
                </option>
                <option disabled value="" v-if="lang == 'en'">
                  choose country
                </option>
                <option
                  v-for="country in countries"
                  :key="country.id"
                  :value="country.id"
                >
                  {{ country.name }}
                </option>
              </select>
            </div>
            <div
              v-if="cities"
              class="form-group custom-select"
              :class="{ disabled: disabledCities }"
            >
              <select v-model="data.fatherCity_id">
                <option disabled value="" v-if="lang == 'ar'">
                  إختر المدينة
                </option>
                <option disabled value="" v-if="lang == 'en'">
                  choose City
                </option>
                <option v-for="city in cities" :key="city.id" :value="city.id">
                  {{ city.name }}
                </option>
              </select>
            </div>
            <div class="form-group-checkbox">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
                v-model="data.check"
              />
              <label class="form-check-label" for="exampleCheck1">
                {{ item.register.form.check }}
              </label>
            </div>
          </div>
        </transition>
        <!--  -->
        <div
          class="all-main-btn main-btn text-center mt-5 mb0-5 d-flex btn-steps"
        >
          <button @click="registerBTN()" type="button" v-if="step < 3">
            {{ item.register.form.buttonNext }}
            <span v-if="waiting"> <i class="fas fa-spinner"></i> </span>
          </button>
          <button @click="prevButton" type="button" v-if="step >= 2">
            {{ item.register.form.buttonPrev }}
          </button>
          <button @click="registerBTN" type="button" v-if="step == 3">
            <span v-if="waiting"> <i class="fas fa-spinner"></i> </span>
            <p v-else>{{ item.register.form.button }}</p>
          </button>
        </div>

        <div class="register-auth-url mt-5 mb-5" v-if="step == 1">
          <h6>
            {{ item.register.dontHaveAccount }}
            <router-link tag="a" to="/login">{{
              item.register.joinNow
            }}</router-link>
          </h6>
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
  name: "register",
  data() {
    return {
      lang: localStorage.getItem("epfa_lang"),

      countries: null,
      country_id: "",
      cities: null,
      disabledCities: true,
      positions: null,
      clubs: null,

      user_id: "",

      data: {
        avatar_image: null,
        avatar_imageSrc: null,
        userName: "",
        date: "",
        placeOfBirth: "",
        nationality: "",
        password: "",
        // Step 2
        position_id: "",
        postalCode: "",
        address: "",
        phone: "",
        mobile: "",
        city_id: "",
        // Step 3
        club_id: "",
        category: "",
        endDate: "",
        agentName: "",
        fatherAddress: "",
        fatherPostalCode: "",
        fatherCity_id: "",
        check: "",
      },
      waiting: false,
      step: 1,
      error: {
        static: {
          error: false,
          text: "",
        },
      },
      mainText: [],
    };
  },
  methods: {
    avatar_uploadImage(event) {
      this.data.avatar_image = event.target.files[0];
      this.data.avatar_imageSrc = URL.createObjectURL(this.data.avatar_image);
    },

    registerBTN() {
      if (this.step == 1) {
        if (this.data.avatar_image == null) {
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
        } else if (this.data.nationality == "") {
          setTimeout(() => {
            this.$iziToast.error({
              message: (this.error.static.text = "برجاء إدخال الجنسية"),
              position: "bottomRight",
              rtl: true,
            });
          });
        } else if (this.data.password == "") {
          setTimeout(() => {
            this.$iziToast.error({
              message: (this.error.static.text = "برجاء إدخال كلمة المرور"),
              position: "bottomRight",
              rtl: true,
            });
          });
        } else {
          this.waiting = true;

          const data = new FormData();
          data.append("username", this.data.userName);
          data.append("date_of_birth", this.data.date);
          data.append("birth_location", this.data.placeOfBirth);
          data.append("nationality", this.data.nationality);
          data.append("password", this.data.password);
          data.append("cover", this.data.avatar_image);

          axios("/register/player", {
            method: "post",
            data,
            headers: {
              Accept: "application/json",
              "Accept-language": this.lang,
            },
          })
            .then((res) => {
              if (res.data.status === "success") {
                this.waiting = false;
                this.user_id = res.data.user_id;
                this.step++;
              }
            })
            .catch((err) => {
              this.waiting = false;
              this.$iziToast.error({
                message: (this.error.static.text =
                  err.response.data.errors.username[0]),
                position: "bottomRight",
                rtl: true,
              });
            });
        }
      }
      // Steps
      if (this.step == 2) {
        if (this.data.position_id == "") {
          setTimeout(() => {
            this.$iziToast.error({
              message: (this.error.static.text =
                "برجاء إدخال مركزك (مؤهل للعب في)"),
              position: "bottomRight",
              rtl: true,
            });
          });
        } else if (this.data.postalCode == "") {
          setTimeout(() => {
            this.$iziToast.error({
              message: (this.error.static.text = "برجاء إدخال الرمز البريدي"),
              position: "bottomRight",
              rtl: true,
            });
          });
        } else if (this.data.city_id == "") {
          setTimeout(() => {
            this.$iziToast.error({
              message: (this.error.static.text =
                "برجاء إدخال المدينة / المحافظة"),
              position: "bottomRight",
              rtl: true,
            });
          });
        } else if (this.data.address == "") {
          setTimeout(() => {
            this.$iziToast.error({
              message: (this.error.static.text = "برجاء إدخال العنوان"),
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
        } else if (this.data.mobile == "") {
          setTimeout(() => {
            this.$iziToast.error({
              message: (this.error.static.text =
                "برجاء إدخال رقم التليفون المتحرك"),
              position: "bottomRight",
              rtl: true,
            });
          });
        } else {
          this.waiting = true;

          const data = new FormData();
          data.append("step", 2);
          data.append("user_id", this.user_id);

          data.append("position_id", this.data.position_id);
          data.append("zip_code", this.data.postalCode);
          data.append("address", this.data.address);
          data.append("city_id", this.data.city_id);
          data.append("phone", this.data.phone);
          data.append("other_phone", this.data.mobile);

          axios
            .post("complete_register/player", data, {
              headers: {
                "Accept-language": this.lang,
                "cache-control": "no-cache",
                "Content-type": "multipart/form-data",
                Accept: "application/json",
              },
            })
            .then((res) => {
              if (res.data.status === "success") {
                this.waiting = false;
                this.step++;
              }
            })
            .catch((err) => {
              this.waiting = false;
              this.$iziToast.error({
                message: (this.error.static.text =
                  err.response.data.errors.username[0]),
                position: "bottomRight",
                rtl: true,
              });
            });
        }
      }
      // Steps
      if (this.step == 3) {
        this.waiting = true;
        if (this.data.club_id == "") {
          setTimeout(() => {
            this.$iziToast.error({
              message: (this.error.static.text = "برجاء إدخال النادي الحالي"),
              position: "bottomRight",
              rtl: true,
            });
            this.waiting = false;
          });
        } else if (this.data.category == "") {
          setTimeout(() => {
            this.$iziToast.error({
              message: (this.error.static.text = "برجاء إدخال القسم"),
              position: "bottomRight",
              rtl: true,
            });
            this.waiting = false;
          });
        } else if (this.data.endDate == "") {
          setTimeout(() => {
            this.$iziToast.error({
              message: (this.error.static.text =
                "برجاء إدخال  تاريخ انتهاء العقد"),
              position: "bottomRight",
              rtl: true,
            });
            this.waiting = false;
          });
        } else if (this.data.fatherPostalCode == "") {
          setTimeout(() => {
            this.$iziToast.error({
              message: (this.error.static.text = "الرمز البريدي للأب مطلوب"),
              position: "bottomRight",
              rtl: true,
            });
            this.waiting = false;
          });
        } else if (this.data.fatherCity_id == "") {
          setTimeout(() => {
            this.$iziToast.error({
              message: (this.error.static.text = "مدينة الأب مطلوبة"),
              position: "bottomRight",
              rtl: true,
            });
            this.waiting = false;
          });
        } else if (this.data.agentName == "") {
          setTimeout(() => {
            this.$iziToast.error({
              message: (this.error.static.text = "اسم الوكيل مطلوب"),
              position: "bottomRight",
              rtl: true,
            });
            this.waiting = false;
          });
        } else {
          let data = new FormData();
          data.append("step", 3);
          data.append("user_id", this.user_id);

          data.append("club_id", this.data.club_id);
          data.append("section", this.data.category);
          data.append("contract_expire_date", this.data.endDate);
          data.append("agent_name", this.data.agentName);
          data.append("parent_address", this.data.fatherAddress);
          data.append("parent_city_id", this.data.fatherCity_id);

          if (this.data.check == true) {
            data.append("is_ill", 1);
          } else {
            data.append("is_ill", 0);
          }

          axios
            .post("complete_register/player", data, {
              headers: {
                "Accept-language": this.lang,
                "cache-control": "no-cache",
                "Content-type": "multipart/form-data",
                Accept: "application/json",
              },
            })
            .then(() => {
              this.waiting = false;
              this.step++;
              this.$iziToast.success({
                message: (this.error.static.text = "تم تسجيل عضويتك بنجاح"),
                position: "bottomRight",
                rtl: true,
              });
              this.$router.push({ name: "login" });
            })
            .catch((err) => {
              console.log(err.message);
              this.waiting = false;
              this.$iziToast.error({
                messagse: err.response.data.message,
                position: "bottomRight",
                rtl: true,
              });
            });
        }
      }
    },

    getCities() {
      // City Request
      axios(`cities/${this.country_id}`, {
        // axios("cities/071978b3-9dda-426d-90b3-d5f9777cd056", {
        headers: {
          "Accept-language": this.lang,
          "cache-control": "no-cache",
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => {
        this.disabledCities = false;
        this.cities = res.data.data;
      });
    },

    nextButton() {
      this.step++;
    },

    prevButton() {
      this.step--;
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
    // Countries Request
    axios("countries", {
      headers: {
        "Accept-language": this.lang,
        "cache-control": "no-cache",
        "Content-type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      this.countries = res.data.data;
    });

    // Positions Request
    axios("positions", {
      headers: {
        "Accept-language": this.lang,
        "cache-control": "no-cache",
        "Content-type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      this.positions = res.data.data;
    });

    // Clubs Request
    axios("home/clubs", {
      headers: {
        "Accept-language": this.lang,
        "cache-control": "no-cache",
        "Content-type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      this.clubs = res.data.data;
    });
  },
};
</script>
