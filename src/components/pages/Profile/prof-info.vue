<template>
  <div class="genralInfo contactInfo">
    <div
      class="form-auth-login mb-5 mt-5"
      v-for="item in mainText"
      :key="item.id"
    >
      <div class="form-step1 fadeIn">
        <div class="row">
          <div class="col-md-6">
            <div v-if="clubs" class="form-group custom-select">
              <select v-model="data.club_id">
                <option v-for="club in clubs" :key="club.id" :value="club.id">
                  {{ club.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="text"
                name="fatherPostalCode"
                class="form-control"
                v-model="data.section"
                placeholder=" "
              />
              <label for="fatherPostalCode">
                {{ item.profile.proftInfo.section }}
              </label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="date"
                name="fatherPostalCode"
                class="form-control"
                v-model="data.expireDate"
                placeholder=" "
              />
              <label for="fatherPostalCode">
                {{ item.profile.proftInfo.expireDate }}
              </label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="text"
                name="fatherPostalCode"
                class="form-control"
                v-model="data.parentAddress"
                placeholder=" "
              />
              <label for="fatherPostalCode">
                {{ item.profile.proftInfo.parentAddress }}
              </label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="text"
                name="fatherPostalCode"
                class="form-control"
                v-model="data.parentPostalCode"
                placeholder=" "
              />
              <label for="fatherPostalCode">
                {{ item.profile.proftInfo.parentPostalCode }}
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
                  {{ cityName }}
                </option>
                <option v-for="city in cities" :key="city.id" :value="city.id">
                  {{ city.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-group-checkbox">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              v-model="data.check"
            />
            <label class="form-check-label" for="exampleCheck1">
              {{ item.profile.proftInfo.check }}
            </label>
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
      clubs: null,
      clubName: "",

      countries: null,
      country_id: "",
      cities: null,
      cityName: "",

      data: {
        city_id: "",
        club_id: "",
        section: "",
        expireDate: "",
        parentAddress: "",
        parentPostalCode: "",
        check: null,
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
    this.getClubs();
  },

  methods: {
    updateData() {
      if (
        this.data.club_id == "" ||
        this.data.section == "" ||
        this.data.expireDate == "" ||
        this.data.parentAddress == "" ||
        this.data.parentPostalCode == "" ||
        this.data.city_id == ""
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
        data.append("club_id", this.data.club_id);
        data.append("section", this.data.section);
        data.append("contract_expire_date", this.data.expireDate);
        data.append("parent_address", this.data.parentAddress);
        data.append("parent_address_zip", this.data.parentPostalCode);
        data.append("parent_city_id", this.data.city_id);
        data.append("is_ill", this.data.check);

        axios
          .post("player/career/data", data, {
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
          if (res.data.status === "success") {
            this.playerDate = res.data.data;

            this.clubName = this.playerDate.club_data.name;
            this.data.club_id = this.playerDate.club_data.id;

            this.country_id = this.playerDate.parent_city_data.country_id;
            this.getCities();

            this.cityName = this.playerDate.parent_city_data.name;
            this.data.city_id = this.playerDate.parent_city_data.id;

            this.data.section = this.playerDate.section;
            this.data.expireDate = this.playerDate.contract_expire_date;
            this.data.parentAddress = this.playerDate.parent_address;
            this.data.parentPostalCode = this.playerDate.parent_address_zip;
            this.data.check = this.playerDate.is_ill;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

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

    getClubs() {
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
  },

  created() {},
};
</script>

