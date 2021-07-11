<template>
  <div class="genralInfo contactInfo">
    <div class="dd" v-for="jsonItem in mainText" :key="jsonItem.id">
      <div
        class="form-auth-login mb-5 mt-5"
        v-for="item in mainText"
        :key="item.id"
      >
        <div class="form-step1 fadeIn">
          <div class="row">
            <div class="col-md-6">
              <div v-if="positions" class="form-group custom-select">
                <select v-model="data.position_id">
                  <option
                    style="font-size: 20px; color: #000"
                    value=""
                    selected
                    disabled
                  >
                    "{{ positionName }}"
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
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <input
                  type="text"
                  id="fatherPostalCsodes"
                  name="fathersPostalCode"
                  class="form-control"
                  v-model="data.PostalCode"
                  placeholder=" "
                />
                <label for="fatherPostalCode">
                  {{ item.profile.contactInfo.postalCode }}
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <input
                  type="text"
                  id="fatherPovstalCsodea"
                  name="fathesrPostalCode"
                  class="form-control"
                  v-model="data.address"
                  placeholder=" "
                />
                <label for="fatherPostalCode">
                  {{ item.profile.contactInfo.address }}
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div v-if="countries" class="form-group custom-select">
                <select v-model="country_id" @change="getCities()">
                  <option
                    v-for="country in countries"
                    :key="country.id"
                    :value="country.id"
                  >
                    {{ country.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group custom-select">
                <select v-model="data.city_id">
                  <option
                    style="font-size: 20px; color: #000"
                    value=""
                    selected
                    disabled
                  >
                    "{{ cityName }}"
                  </option>
                  <option
                    v-for="city in cities"
                    :key="city.id"
                    :value="city.id"
                  >
                    {{ city.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <input
                  type="text"
                  id="fathevrPostaslCodeq"
                  name="fatherPostalCode"
                  class="form-control"
                  v-model="data.phone"
                  placeholder=" "
                />
                <label for="fatherPostalCode">
                  {{ item.profile.contactInfo.phone }}
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <input
                  type="text"
                  id="fathervPostalCosdez"
                  name="fatherPostalCode"
                  class="form-control"
                  v-model="data.other_phone"
                  placeholder=" "
                />
                <label for="fatherPostalCode">
                  {{ item.profile.contactInfo.other_phone }}
                </label>
              </div>
            </div>

            <!-- Edit -->
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

<style scoped>
.upload_wrap {
  margin-bottom: 2rem;
}
</style>

<script>
import axios from "axios";

import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";

export default {
  data() {
    return {
      mainText: [],
      lang: localStorage.getItem("epfa_lang"),
      id: "",
      waiting: false,
      positions: null,
      positionName: "",
      countries: null,
      country_id: "",
      cities: null,
      cityName: "",
      playerDate: null,

      data: {
        position_id: "",
        city_id: "",

        PostalCode: "",
        address: "",
        phone: "",
        other_phone: "",
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
    this.getPlayerData();
    this.getCountries();
    this.getPositions();
  },

  methods: {
    getCities() {
      // City Requesst
      axios("cities/" + this.country_id, {
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

    getCountries() {
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
    },

    getPositions() {
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
    },

    getPlayerData() {
      axios
        .get("profile", {
          headers: {
            Accept: "application/json",
            "Accept-language": this.lang,
            Authorization: "bearer" + localStorage.getItem("efba-token"),
          },
        })
        .then((res) => {
          this.playerDate = res.data.data;

          this.positionName = this.playerDate.position_data.name;
          this.data.position_id = this.playerDate.position_data.id;

          this.country_id = this.playerDate.city_data.country_id;
          this.getCities();

          this.cityName = this.playerDate.city_data.name;
          this.data.city_id = this.playerDate.city_data.id;

          this.data.PostalCode = this.playerDate.zip_code;
          this.data.address = this.playerDate.address;
          this.data.phone = this.playerDate.phone;
          this.data.other_phone = this.playerDate.other_phone;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateData() {
      if (
        this.data.position_id == "" ||
        this.data.city_id == "" ||
        this.data.PostalCode == "" ||
        this.data.address == "" ||
        this.data.phone == "" ||
        this.data.other_phone == ""
      ) {
        setTimeout(() => {
          this.$iziToast.error({
            title: "Error",
            message: (this.error.static.text = "برجاء ملئ البيانات"),
            position: "bottomRight",
            rtl: true,
          });
        });
      } else {
        this.waiting = true;

        const data = new FormData();
        data.append("position_id", this.data.position_id);
        data.append("zip_code", this.data.PostalCode);
        data.append("address", this.data.address);
        data.append("city_id", this.data.city_id);
        data.append("phone", this.data.phone);
        data.append("other_phone", this.data.other_phone);

        axios
          .post("player/contact/data", data, {
            headers: {
              Accept: "application/json",
              "Accept-language": this.lang,
              Authorization: "bearer" + localStorage.getItem("efba-token"),
            },
          })
          .then((res) => {
            if (res.data.status === "success") {
              this.waiting = false;

              this.$iziToast.success({
                title: "success",
                message: (this.error.static.text = "تم تعديل الباينات بنجاح"),
                position: "bottomRight",
                rtl: true,
              });
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
    },
  },

  created() {},
};
</script>

