<template>
  <div>
    <div class="newVote" v-for="item in mainText" :key="item.id">
      <div class="breadcrumb">
        <div class="container">
          <h1 v-if="lang == 'ar'">التصويت</h1>
          <h1 v-if="lang == 'en'">Voting</h1>
          <p v-if="lang == 'ar'">قم باختيار افضل اللاعبين</p>
          <p v-if="lang == 'en'">Choose Best Players</p>
        </div>
      </div>
      <!-- End  Breadcrumb -->

      <!-- Players_1 -->
      <div
        class="_container voteCards"
        data-aos="zoom-in"
        data-aos-delay="200"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <div class="monthPlayers">
          <div class="title-sections">
            <h4>
              لاعبين
              <span>ديسيمبر</span>
            </h4>
          </div>
          <div class="row">
            <div class="col-lg-6" v-for="player in players_1" :key="player.id">
              <div
                class="player"
                :style="{ backgroundImage: `url(${playerBackground})` }"
              >
                <img :src="player.image" />
                <div class="info">
                  <h3>{{ player.username }}</h3>
                  <ul>
                    <li>
                      <span>{{ item.profile.single_player.currentClub }}</span>
                      <small>:</small>{{ player.club }}
                    </li>
                    <li>
                      <span>{{ item.profile.single_player.position }}</span>
                      <small>:</small>{{ player.position }}
                    </li>
                    <li>
                      <span>{{ item.profile.single_player.nationality }}</span>
                      <small>:</small>{{ player.nationality }}
                    </li>
                  </ul>
                </div>

                <progress-bar
                  v-if="showProgress"
                  :barValue="player.rate"
                ></progress-bar>
                <div class="choose" v-else>
                  <button @click="choosePlayer" class="login-btn">
                    {{ lang == "ar" ? "اختيار" : "choose" }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Players_2 -->
      <div
        class="voteCards_show"
        :style="{
          backgroundImage: `url(${require('@/assets/images/entrants/main_bg.png')})`,
        }"
      >
        <div class="_container">
          <div class="monthPlayers">
            <div class="title-sections">
              <h4>
                ارشيف
                <span style="color: #fff">المسابقة</span>
              </h4>
            </div>

            <div class="filter">
              <div class="input_wrapper select">
                <img class="icon_select" src="@/assets/images/select.png" />
                <b-form-select
                  class="form-control"
                  v-model="filter.year"
                  :options="years"
                ></b-form-select>
              </div>
              <div class="input_wrapper select">
                <img class="icon_select" src="@/assets/images/select.png" />
                <b-form-select
                  class="form-control"
                  v-model="filter.month"
                  :options="months"
                ></b-form-select>
              </div>
            </div>

            <div
              class="row"
              data-aos="zoom-in"
              data-aos-delay="200"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-once="true"
            >
              <div
                class="col-lg-4 col-md-6 col-12"
                v-for="player in players_2"
                :key="player.id"
              >
                <div
                  :style="{ backgroundImage: `url(${playerBackground})` }"
                  class="player"
                >
                  <img :src="player.image" />
                  <div class="info">
                    <h3>{{ player.username }}</h3>
                    <ul>
                      <li>
                        <span>{{
                          item.profile.single_player.currentClub
                        }}</span>
                        <small>:</small>{{ player.club }}
                      </li>
                      <li>
                        <span>{{ item.profile.single_player.position }}</span>
                        <small>:</small>{{ player.position }}
                      </li>
                      <li>
                        <span>{{
                          item.profile.single_player.nationality
                        }}</span>
                        <small>:</small>{{ player.nationality }}
                      </li>
                    </ul>
                    <progress-bar :barValue="player.rate"></progress-bar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- News -->
      <div class="newsSection">
        <div class="container">
          <!-- News -->
          <div class="title-sections">
            <h4>
              {{ item.news.mainTitle.one }}
              <span>{{ item.news.mainTitle.tow }}</span>
            </h4>
          </div>
          <!-- News Section -->
          <div class="row">
            <!-- Single -->
            <div
              v-for="New in relateNews"
              :key="New.id"
              class="col-md-4"
              data-aos="zoom-in"
              data-aos-delay="200"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-once="true"
            >
              <div class="single-new">
                <router-link :to="'/news/' + New.id" tag="a">
                  <div class="img-new">
                    <img @error="replaceByDefault" :src="New.media" alt="" />
                  </div>
                  <div class="text-new">
                    <h4>
                      {{ New.title }}
                    </h4>
                    <ul class="d-flex justify-content-right">
                      <li>
                        <i class="fa fa-calendar"></i>
                        {{ New.created_at | moment("dddd, MMMM Do YYYY") }}
                      </li>
                      <li>
                        <i class="fa fa-clock"></i>
                        {{ New.created_at | moment("h:mm a") }}
                      </li>
                    </ul>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from "../pages/Global/ProgressBar.vue";

import axios from "axios";
import imgFalse from "@/assets/images/news/new2.png";
import textAr from "../../json/mainText/text-ar.json";
import textEn from "../../json/mainText/text-en.json";

export default {
  components: { ProgressBar },

  data() {
    return {
      relateNews: [],
      lang: localStorage.getItem("epfa_lang"),
      mainText: null,
      showProgress: false,

      players_1: [
        {
          id: 1,
          username: "علي معلول",
          club: "الأهلي",
          position: "ظهير أيسر",
          nationality: "التونسية",
          image: require("@/assets/images/entrants/ent1.png"),
          rate: 10,
        },
        {
          id: 2,
          username: "علي معلول",
          club: "الأهلي",
          position: "ظهير أيسر",
          nationality: "التونسية",
          image: require("@/assets/images/entrants/ent2.png"),
          rate: 20,
        },
        {
          id: 3,
          username: "علي معلول",
          club: "الأهلي",
          position: "ظهير أيسر",
          nationality: "التونسية",
          image: require("@/assets/images/entrants/ent3.png"),
          rate: 30,
        },
        {
          id: 4,
          username: "علي معلول",
          club: "الأهلي",
          position: "ظهير أيسر",
          nationality: "التونسية",
          image: require("@/assets/images/entrants/ent4.png"),
          rate: 40,
        },
        {
          id: 5,
          username: "علي معلول",
          club: "الأهلي",
          position: "ظهير أيسر",
          nationality: "التونسية",
          image: require("@/assets/images/entrants/ent3.png"),
          rate: 50,
        },
        {
          id: 6,
          username: "علي معلول",
          club: "الأهلي",
          position: "ظهير أيسر",
          nationality: "التونسية",
          image: require("@/assets/images/entrants/ent4.png"),
          rate: 80,
        },
      ],
      players_2: [
        {
          id: 1,
          username: "علي معلول",
          club: "الأهلي",
          position: "ظهير أيسر",
          nationality: "التونسية",
          image: require("@/assets/images/entrants/ent1.png"),
          rate: 10,
        },
        {
          id: 2,
          username: "علي معلول",
          club: "الأهلي",
          position: "ظهير أيسر",
          nationality: "التونسية",
          image: require("@/assets/images/entrants/ent2.png"),
          rate: 20,
        },
        {
          id: 3,
          username: "علي معلول",
          club: "الأهلي",
          position: "ظهير أيسر",
          nationality: "التونسية",
          image: require("@/assets/images/entrants/ent3.png"),
          rate: 30,
        },
        {
          id: 4,
          username: "علي معلول",
          club: "الأهلي",
          position: "ظهير أيسر",
          nationality: "التونسية",
          image: require("@/assets/images/entrants/ent4.png"),
          rate: 40,
        },
        {
          id: 5,
          username: "علي معلول",
          club: "الأهلي",
          position: "ظهير أيسر",
          nationality: "التونسية",
          image: require("@/assets/images/entrants/ent3.png"),
          rate: 50,
        },
        {
          id: 6,
          username: "علي معلول",
          club: "الأهلي",
          position: "ظهير أيسر",
          nationality: "التونسية",
          image: require("@/assets/images/entrants/ent4.png"),
          rate: 80,
        },
      ],

      playerBackground: require("@/assets/images/entrants/player_bg.png"),

      filter: {
        year: null,
        month: null,
      },

      years: [
        {
          value: null,
          text: this.lang == "ar" ? "اختر سنة" : "select year",
          disabled: true,
        },
      ],
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
  },

  methods: {
    getData() {
      axios
        .get("related/news", {
          headers: {
            "Accept-language": this.lang,
            "cache-control": "no-cache",
            "Content-type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((res) => {
          this.relateNews = res.data.data;
        });
    },

    replaceByDefault(e) {
      e.target.src = imgFalse;
    },

    choosePlayer() {
      this.showProgress = true;
    },
  },

  mounted() {
    this.getData();

    // Months

    this.months = this.months.map((item) => {
      return {
        value: item,
        text: item,
      };
    });
    this.months.unshift({
      value: null,
      text: this.lang == "ar" ? "اختر شهر" : "select month",
      disabled: true,
    });

    if (this.lang == "ar") {
      this.mainText = textAr.data;
    } else {
      this.mainText = textEn.data;
    }
  },
};
</script>

<style lang="scss" scoped>
.single-new {
  height: 300px;
  a {
    display: block;
    height: 100%;
    .img-new {
      height: 100%;
      img {
        transition: all 0.2s linear;
        object-fit: cover;
        height: 100%;
      }
    }
    .text-new {
      width: 100%;
    }
  }
  &:hover {
    a {
      .img-new {
        img {
          transform: scale(1.2);
        }
      }
    }
  }
}

.input_wrapper.select {
  margin-bottom: 18px;
  position: relative;
  width: 160px;
  text-align: center;

  select {
    text-align: center;
    border-radius: 20px;
    cursor: pointer;
    background: #353c4e;
    border: 1px solid #4d556b;
    color: #969eb4;

    &:focus {
      background: #353c4e;
      border: 1px solid #4d556b;
      box-shadow: none;

      & + .icon_select {
        transform: translateY(-10%) rotate(-180deg);
      }
    }
  }

  .icon_select {
    position: absolute;
    top: 50%;
    transform: translateY(-50%) rotate(0);
    left: 15px;
    transition: all 0.2s linear;
  }
}

._container {
  width: 70%;
  margin-inline: auto;

  @media (max-width: 1300px) {
    width: 80%;
  }

  @media (max-width: 500px) {
    width: 95%;
  }
}

.player {
  display: flex;
  margin: 15px 0;
  align-items: flex-end;
  padding: 10px 10px 0 10px;
  border-radius: 15px;
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;

    & > * {
      margin: 10px 0;
    }
  }

  img {
    object-fit: cover;
    height: 140px;
    margin-inline-end: 10px;
  }

  .info {
    h3 {
      color: #fff;
      font-size: 20px;
    }

    ul {
      color: #454951;
    }
  }

  .choose {
    flex-grow: 1;
    // padding: 10px;

    button {
      background-color: var(--aw-red);
      text-align: center;
      border-top-left-radius: 25px;
      border-bottom-right-radius: 25px;
      border-bottom-left-radius: 25px;
      margin: 0 8px;
      color: var(--aw-light);
      height: 45px;
      line-height: 45px;
      display: block;
      padding: 0 15px;
      width: -webkit-max-content;
      width: -moz-max-content;
      width: 100px;
      font-weight: bold;
      margin-right: 0;
      margin-top: 20px;
      border: none;
      margin-block: 10px;
      margin-inline: auto;
    }
  }
}

.voteCards_show {
  margin: 30px 0;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px;

  .player {
    img {
      height: 150px;
      width: 146px;
    }
  }
}

.filter {
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    margin: 0 15px;
  }
}

.progressBar {
  width: 100%;
  margin: 0 10px;
}
</style>
