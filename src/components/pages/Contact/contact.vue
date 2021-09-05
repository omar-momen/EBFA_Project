<template>
  <div class="contactPage">
    <div class="dd" v-for="jsonItem in mainText" :key="jsonItem.id">
      <!-- Start  Breadcrumb -->
      <div class="breadcrumb">
        <div class="container">
          <h1>{{ jsonItem.contact.breadcrumbTitle }}</h1>
          <p>{{ jsonItem.contact.breadcrumbContent }}</p>
        </div>
      </div>
      <!-- End  Breadcrumb -->

      <!-- Start Content Contact Us -->
      <div class="container">
        <div class="bg-contact">
          <div class="row">
            <div
              class="col-md-6"
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-once="true"
            >
              <div class="title-sections text-end">
                <h4>
                  {{ jsonItem.contact.mainTitles.one.subOne }}
                  <span>{{ jsonItem.contact.mainTitles.one.subTow }}</span>
                </h4>
                <p>{{ jsonItem.contact.mainTitles.tow }}</p>
                <h6>{{ jsonItem.contact.mainTitles.three }}</h6>
              </div>

              <ul class="contact-info" v-if="contact">
                <li>
                  <a href="#">
                    <i class="fas fa-map-marker-alt"></i>
                    {{ contact.address }}
                  </a>
                </li>
                <li>
                  <a :href="'tel:' + contact.phone">
                    <i class="fas fa-phone-alt"></i>
                    {{ contact.phone }}
                  </a>
                </li>
                <li>
                  <a :href="'//api.whatsapp.com/send?phone=+' + contact.phone">
                    <i class="fab fa-whatsapp"></i> {{ contact.phone }}
                  </a>
                </li>
                <li>
                  <a :href="'mailto:' + contact.email">
                    <i class="fas fa-envelope"></i>
                    {{ contact.email }}
                  </a>
                </li>
              </ul>
            </div>

            <div
              class="col-md-6"
              data-aos="zoom-in"
              data-aos-delay="200"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-once="true"
            >
              <div
                class="form-auth-login form-contact"
                :class="{ english: lang == 'en' }"
              >
                <h3>{{ jsonItem.contact.mainTitles.three }}</h3>
                <div class="form-step1 fadeIn">
                  <div class="form-group">
                    <select class="form-control" v-model="data.reason_id">
                      <option value="" disabled>
                        {{ jsonItem.contact.form.type }}
                      </option>
                      <option
                        v-for="reason in reasons"
                        :key="reason.id"
                        :value="reason.id"
                      >
                        {{ reason.name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      name="fullname"
                      class="form-control"
                      id="fullname"
                      placeholder=" "
                      v-model="data.fullname"
                    />
                    <label for="username">
                      {{ jsonItem.contact.form.name }}
                      <small>*</small>
                    </label>
                  </div>
                  <div class="form-group">
                    <input
                      type="tel"
                      name="mobile"
                      class="form-control"
                      id="mobile"
                      placeholder=" "
                      v-model="data.mobile"
                    />
                    <label for="mobile">
                      {{ jsonItem.contact.form.phone }}
                      <small>*</small>
                    </label>
                  </div>
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      id="message"
                      :placeholder="jsonItem.contact.form.subject"
                      v-model="data.message"
                    ></textarea>
                  </div>
                  <div
                    class="
                      all-main-btn
                      main-btn
                      text-center
                      mt-5
                      mb0-5
                      d-flex
                      btn-steps
                    "
                  >
                    <button type="button" v-if="waiting">
                      <span> <i class="fas fa-spinner"></i> </span>
                    </button>
                    <button type="button" @click="contactBTN" v-else>
                      {{ jsonItem.contact.send }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Content Contact Us -->

      <!-- Start Map -->
      <div class="map-contact-location">
        <GmapMap :center="myPosition" :zoom="7" map-type-id="terrain">
          <GmapMarker
            :position="myPosition"
            :clickable="true"
            :draggable="true"
          />
          />
        </GmapMap>
      </div>
      <!-- End Map -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-contact.english {
  label {
    right: 0;
    left: 15px !important;
  }
}

.title-sections {
  text-align: start !important;
}

[data-aos][data-aos][data-aos-delay="200"].aos-animate {
  z-index: 5;
}
.map-contact-location {
  z-index: 2;
}
</style>

<script>
import axios from "axios";

import textAr from "../../../json/mainText/text-ar.json";
import textEn from "../../../json/mainText/text-en.json";

export default {
  name: "ContactUs",
  data() {
    return {
      lang: localStorage.getItem("epfa_lang"),

      map: null,
      myPosition: {
        lat: 0,
        lng: 0,
      },

      reasons: null,
      contact: null,

      data: {
        fullname: "",
        reason_id: "",
        mobile: "",
        message: "",
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
    contactBTN() {
      this.waiting = true;

      if (this.data.contactType == "") {
        setTimeout(() => {
          this.$iziToast.error({
            message: (this.error.static.text = "برجاء إدخال نوع الإتصال"),
            position: "bottomRight",
            rtl: true,
          });
          this.waiting = false;
        });
      } else if (this.data.fullname == "") {
        setTimeout(() => {
          this.$iziToast.error({
            message: (this.error.static.text = "برجاء إدخال الإسم هنا"),
            position: "bottomRight",
            rtl: true,
          });
          this.waiting = false;
        });
      } else if (this.data.mobile == "") {
        setTimeout(() => {
          this.$iziToast.error({
            message: (this.error.static.text = "برجاء إدخال رقم الموبايل"),
            position: "bottomRight",
            rtl: true,
          });
          this.waiting = false;
        });
      } else if (this.data.mobile.length < 8) {
        setTimeout(() => {
          this.$iziToast.error({
            message: (this.error.static.text = "برجاء ادخال رقم هاتف صحيح"),
            position: "bottomRight",
            rtl: true,
          });
          this.waiting = false;
        });
      } else if (this.data.message == "") {
        setTimeout(() => {
          this.$iziToast.error({
            message: (this.error.static.text = "برجاء إدخال رسالتك "),
            position: "bottomRight",
            rtl: true,
          });
          this.waiting = false;
        });
      } else {
        this.waiting = true;

        const data = new FormData();
        data.append("reason_id", this.data.reason_id);
        data.append("title", this.data.fullname);
        data.append("phone", this.data.mobile);
        data.append("message", this.data.message);

        axios
          .post("contact/us", data, {
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
              this.$iziToast.success({
                title: "success",
                message: (this.error.static.text = "تم إرسال رسالتك بنجاح"),
                position: "bottomRight",
                rtl: true,
              });
              setTimeout(() => {
                window.location.reload();
              }, 1000);
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
  mounted() {
    if (this.lang == "ar") {
      this.mainText = textAr.data;
    } else {
      this.mainText = textEn.data;
    }
  },
  created() {
    axios
      .get("contact", {
        headers: {
          "Accept-language": this.lang,
          "cache-control": "no-cache",
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
        params: {
          type: "image",
        },
      })
      .then((res) => {
        this.contact = res.data.data;
      });

    axios
      .get("location", {
        headers: {
          "Accept-language": this.lang,
          "cache-control": "no-cache",
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((res) => {
        this.map = res.data;
        this.myPosition.lat = parseInt(this.map.lat);
        this.myPosition.lng = parseInt(this.map.lng);
      });

    axios
      .get("home/reasons", {
        headers: {
          "Accept-language": this.lang,
          "cache-control": "no-cache",
          "Content-type": "multipart/form-data",
          Accept: "application/json",
        },
        params: {
          type: "image",
        },
      })
      .then((res) => {
        this.reasons = res.data.data;
      });
  },
};
</script>
